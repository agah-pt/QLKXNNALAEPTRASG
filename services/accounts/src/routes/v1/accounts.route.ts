import { Request, Response, Router } from "express";
import { AccountRepository } from "../../data/account.repository";
import { AccountTransactionRepository } from "../../data/account-transactions.repository";
import {
  CreateAccountRequest,
  CreateAccountTransactionRequest,
  UpdateAccountRequest,
} from "../../models/gen/types.gen";
import { AccountModelUtils } from "../../models/account.model";
import { TransactionModelUtils } from "../../models/transaction.model";
import {
  putAccountCreatedEvent,
  putTransactionCreatedEvent,
} from "../../services/event-bridge";
import { AccountBalancesRepository } from "../../data/account-balances.repository";
import { runInMongoTransaction } from "../../datasource";
import { EntityManager } from "typeorm";

const router = Router();

router.get("/:account_id", async (req: Request, res: Response) => {
  try {
    const accountId = req.params["account_id"];

    const account = await new AccountRepository().getAccount(accountId);

    if (account) {
      const balances = await new AccountBalancesRepository().getBalances(
        accountId,
      );

      const result = AccountModelUtils.fromAccountEntity(account, balances);

      res.status(200).json(result);
    } else {
      res.status(404);
    }
  } catch (error) {
    console.error("An error ocurred:", error);
    res.status(500).json(error);
  }
});

router.patch("/:account_id", async (req: Request, res: Response) => {
  try {
    const accountId = req.params["account_id"];

    const data = req.body as UpdateAccountRequest;

    const account = await new AccountRepository().updateAccount(
      accountId,
      data,
    );

    if (account) {
      const result = AccountModelUtils.fromAccountEntity(account);

      res.status(200).json(result);
    } else {
      res.status(404);
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json(error);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const data = req.body as CreateAccountRequest;

    const account = await new AccountRepository().createAccount(data);

    const result = AccountModelUtils.fromAccountEntity(account);

    // Send events
    putAccountCreatedEvent(result);

    res.status(200).json(result);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json(error);
  }
});

router.get("/:account_id/transactions", async (req: Request, res: Response) => {
  const accountId = req.params["account_id"] as string | undefined;
  if (!accountId) {
    throw new Error("Account Id is a required parameter");
  }

  const result =
    await new AccountTransactionRepository().listAccountTransactions(accountId);

  try {
    res.status(200).json(result);
  } catch (error) {
    console.error("An error ocurred:", error);
    res.status(500).json(error);
  }
});

router.post(
  "/:account_id/transactions",
  async (req: Request, res: Response) => {
    try {
      const accountId = req.params["account_id"] as string | undefined;
      if (!accountId) {
        throw new Error("Account Id is a required parameter");
      }

      const data = req.body as CreateAccountTransactionRequest;

      const transaction = await runInMongoTransaction(
        async (entityManager: EntityManager) => {
          await new AccountBalancesRepository().incrementBalance(
            accountId,
            data.currency,
            data.type === "INBOUND" ? data.amount : -data.amount,
            entityManager,
          );

          return await new AccountTransactionRepository().createAccountTransaction(
            accountId,
            data,
            entityManager,
          );
        },
      );

      const result =
        TransactionModelUtils.fromAccountCurrencyTransactionEntity(transaction);

      // Send events
      putTransactionCreatedEvent(accountId, result);

      res.status(200).json(result);
    } catch (error) {
      console.error("An error ocurred:", error);
      res.status(500).json(error);
    }
  },
);

export default router;
