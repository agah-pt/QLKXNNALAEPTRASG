import { EntityManager, MongoRepository } from "typeorm";
import { getRepository } from "./base.repository";
import { SupportedCurrencies, UUID } from "../models/gen/types.gen";
import { AccountCurrencyBalanceEntity } from "../entities/account-currency-balance.entity";

export class AccountBalancesRepository {
  private async getRepository(
    entityManager?: EntityManager,
  ): Promise<MongoRepository<AccountCurrencyBalanceEntity>> {
    return getRepository(AccountCurrencyBalanceEntity, entityManager);
  }

  async incrementBalance(
    accountId: string,
    currency: SupportedCurrencies,
    amount: number,
    entityManager: EntityManager,
  ) {
    const repository = await this.getRepository(entityManager);

    await repository.updateOne(
      { accountId, currency },
      {
        $inc: {
          balance: amount,
        },
      },
      {
        upsert: true,
      },
    );
  }

  async getBalances(
    accountId: UUID,
    entityManager?: EntityManager,
  ): Promise<AccountCurrencyBalanceEntity[]> {
    const repository = await this.getRepository(entityManager);

    const result = await repository.find({
      where: {
        accountId,
      },
    });

    return result;
  }
}
