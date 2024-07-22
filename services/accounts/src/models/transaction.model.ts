import { AccountCurrencyTransactionEntity } from "../entities/account-currency-transaction.entity";
import { Transaction } from "./gen";

export class TransactionModelUtils {
  static fromAccountCurrencyTransactionEntity(
    item: AccountCurrencyTransactionEntity,
  ): Transaction {
    return {
      transactionId: item.transactionId,
      currency: item.currency,
      type: item.type,
      amount: item.amount,
      createdAt: item.createdAt.toISOString(),
    };
  }
}
