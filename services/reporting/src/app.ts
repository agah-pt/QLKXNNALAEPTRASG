import "reflect-metadata"

import express from 'express';
import serverless from 'serverless-http';

import routes from './routes';
import { Config } from "../../shared/config";
import { TransactionModelUtils } from "./models/transaction.model";
import { TransactionsRepository } from "./data/transactions.repository";

const app = express();

app.use(express.json());

if (Config.listen) {
  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (Config.listen && req.method === "OPTIONS") {
      res.setHeader('Access-Control-Allow-Origin', "*")
      res.setHeader('Access-Control-Allow-Methods', "GET, POST, DELETE, PUT, PATCH, OPTIONS")
      res.setHeader('Access-Control-Allow-Headers', "Content-Type, api_key, Authorization")
      res.status(200).send();
    } else {
      next()
    }
  });
}

app.use('/', routes);

app.use((_req: express.Request, res: express.Response) => {
  res.status(404).send();
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use((err: any, _req: express.Request, res: express.Response) => {
  res.status(err.status || 500).send();
});

export const handler = serverless(app);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transactionCreatedHandler = async (event: any) => {
  const transaction = TransactionModelUtils.fromEventBridgeEvent(event)
  new TransactionsRepository().addTransactionToStatement(event["resources"][0], transaction)
}

if (Config.listen) {
  app.listen(3000)
}
