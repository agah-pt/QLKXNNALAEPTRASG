import { EntityManager, MongoRepository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { AccountCurrencyTransactionEntity } from "../entities/account-currency-transaction.entity";
import { getRepository } from "./base.repository";
import { UUID } from "../models/gen/types.gen";

type AccountCurrencyTransactionEntityValues = Pick<
  AccountCurrencyTransactionEntity,
  "currency" | "type" | "amount"
>;

export class AccountTransactionRepository {
  private async getRepository(
    entityManager: EntityManager | undefined,
  ): Promise<MongoRepository<AccountCurrencyTransactionEntity>> {
    return getRepository(AccountCurrencyTransactionEntity, entityManager);
  }

  async createAccountTransaction(
    accountId: string,
    values: AccountCurrencyTransactionEntityValues,
    entityManager: EntityManager,
  ) {
    const transactionRepository = await this.getRepository(entityManager);

    // Create the transaction
    return await transactionRepository.save(
      transactionRepository.create({
        accountId,
        transactionId: uuidv4(),
        ...values,
      }),
    );
  }

  async listAccountTransactions(
    accountId: UUID,
    entityManager?: EntityManager,
  ): Promise<{
    transactions: AccountCurrencyTransactionEntity[];
    count: number;
  }> {
    const repository = await this.getRepository(entityManager);

    const result = await repository.findAndCount({
      where: {
        accountId,
      },
    });

    return {
      transactions: result[0],
      count: result[1],
    };
  }
}
