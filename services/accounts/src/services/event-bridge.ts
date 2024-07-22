import {
  EventBridgeClient,
  PutEventsCommand,
} from "@aws-sdk/client-eventbridge";
import { defaultProvider } from "@aws-sdk/credential-provider-node";

import { Account, EventTypes, Transaction, UUID } from "../models/gen";

const provider = defaultProvider({});

const client = new EventBridgeClient({ credentials: provider });

export async function putAccountCreatedEvent(account: Account) {
  return putEvents("orbital.accounts-service", "account-created", account, [
    account.accountId,
  ]);
}

export async function putTransactionCreatedEvent(
  accountId: UUID,
  transaction: Transaction,
) {
  return putEvents(
    "orbital.accounts-service",
    "transaction-created",
    transaction,
    [accountId],
  );
}

const putEvents = async (
  source: string,
  detailType: EventTypes,
  detail: object,
  resources: Array<string>,
) => {
  const entries = [
    {
      Detail: JSON.stringify(detail),
      DetailType: detailType,
      Resources: resources,
      Source: source,
    },
  ];

  await client.send(
    new PutEventsCommand({
      Entries: entries,
    }),
  );
};
