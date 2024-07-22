import { EntityManager, MongoRepository } from "typeorm";
import { AccountEntity } from "../entities/account.entity";
import { v4 as uuidv4 } from "uuid";
import { getRepository } from "./base.repository";
import { UUID } from "../models/gen";
import { DatabaseError } from "../@types";

type PartialAccountEntity = Pick<Partial<AccountEntity>, "supportedCurrencies">;

export class AccountRepository {
  async getRepository(
    entityManager: EntityManager | undefined,
  ): Promise<MongoRepository<AccountEntity>> {
    return getRepository(AccountEntity, entityManager);
  }

  async createAccount(
    values: PartialAccountEntity,
    entityManager?: EntityManager,
  ) {
    const repository = await this.getRepository(entityManager);
    return await repository.save(
      repository.create({ accountId: uuidv4(), ...values }),
    );
  }

  async updateAccount(
    accountId: UUID,
    values: PartialAccountEntity,
    entityManager?: EntityManager,
  ) {
    const repository = await this.getRepository(entityManager);

    const result = await repository.updateOne(
      { accountId },
      {
        $set: values,
      },
    );

    if (!result) {
      throw new DatabaseError("Account not found");
    }

    return this.getAccount(accountId, entityManager);
  }

  async getAccount(
    accountId: UUID,
    entityManager?: EntityManager,
  ): Promise<AccountEntity | null> {
    const repository = await this.getRepository(entityManager);

    const account = await repository.findOne({
      where: {
        accountId,
      },
    });

    return account;
  }
}
