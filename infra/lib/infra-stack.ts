import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigateway from 'aws-cdk-lib/aws-apigateway'
import * as events from 'aws-cdk-lib/aws-events'
import * as targets from 'aws-cdk-lib/aws-events-targets'
import * as iam from 'aws-cdk-lib/aws-iam'

import { Construct } from 'constructs';

export class InfraStack extends Stack {

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const accountsLambda = this.makeServiceLambda("accounts");
    const accountsIntegration = new apigateway.LambdaIntegration(accountsLambda)

    const reportsLambda = this.makeServiceLambda("reporting");
    const reportsIntegration = new apigateway.LambdaIntegration(reportsLambda)

    const api = new apigateway.RestApi(this, 'orbital-api');

    const v1 = api.root.addResource("v1");

    const accounts = v1.addResource('accounts');
    accounts.addMethod('POST', accountsIntegration);

    const account = accounts.addResource('{account_id}');
    account.addMethod('GET', accountsIntegration);
    account.addMethod('PATCH', accountsIntegration);

    const accountTransactions = account.addResource("transactions")
    accountTransactions.addMethod('POST', accountsIntegration);
    accountTransactions.addMethod('GET', accountsIntegration);

    const reports = v1.addResource('reports');

    const report = reports.addResource('{account_id}');
    const year = report.addResource('{year}');
    const month = year.addResource('{month}');
    
    month.addMethod('GET', reportsIntegration);

    this.createEnventBridge();

  }

  private createEnventBridge() {
    // transaction-created
    const transactionCreatedRule = new events.Rule(this, 'orbital-bus-transaction-created-rule', {
      eventPattern: {
        source: [
          "orbital.accounts-service"
        ],
        detailType: [
          "transaction-created",
        ],
      }
    });

    const transactionCreatedLambda = this.makeServiceLambda("reporting", "app.transactionCreatedHandler");
    transactionCreatedLambda.addPermission("orbital-bus-transaction-created-permission",
      {
        action: 'lambda:InvokeFunction',
        principal: new iam.ServicePrincipal('events.amazonaws.com'),
        sourceArn: transactionCreatedRule.ruleArn,
      }
    );
    transactionCreatedRule.addTarget(new targets.LambdaFunction(transactionCreatedLambda, {
      maxEventAge: Duration.hours(2),
      retryAttempts: 2,
    }));
  }

  private makeServiceLambda(service: string, handler: string = "app.handler") {
    return new lambda.Function(this, `${service}-lambda-${handler}`, {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromCustomCommand(`../services/${service}/dist`, ['sh', '-c', "npm ci && npm run build"], {
        commandOptions: {
          cwd: `../services/${service}`,
        }
      }),
      timeout: Duration.seconds(60),
      handler,
    });
  }
}

