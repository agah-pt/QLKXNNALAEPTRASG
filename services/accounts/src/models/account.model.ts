import { AccountCurrencyBalanceEntity } from "../entities/account-currency-balance.entity";
import { AccountEntity } from "../entities/account.entity";
import { Account } from "./gen";

export class AccountModelUtils {
  static fromAccountEntity(
    item: AccountEntity,
    balances?: AccountCurrencyBalanceEntity[],
  ): Account {
    const result: Account = {
      accountId: item.accountId,
      supportedCurrencies: item.supportedCurrencies,
    };

    if (balances) {
      result.balances = balances.map((item) => ({
        currency: item.currency,
        amount: item.balance,
      }));
    }

    return result;
  }
}
