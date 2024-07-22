import { DataSource, EntityManager } from "typeorm";
import { Config } from "../../shared/config";
import { AccountCurrencyTransactionEntity } from "./entities/account-currency-transaction.entity";
import { AccountEntity } from "./entities/account.entity";
import { AccountCurrencyBalanceEntity } from "./entities/account-currency-balance.entity";

const mongoDatasource = new DataSource({
  type: "mongodb",
  host: Config.db.host,
  port: +Config.db.port,
  database: Config.db.database,
  username: Config.db.user,
  password: Config.db.password,
  entities: [
    AccountEntity,
    AccountCurrencyTransactionEntity,
    AccountCurrencyBalanceEntity,
  ],
  logger: "debug",
  authSource: "admin",
});

export async function getDatabase() {
  if (mongoDatasource.isInitialized) {
    return mongoDatasource;
  } else {
    return mongoDatasource.initialize();
  }
}

export async function runInMongoTransaction<T>(
  runInTransaction: (entityManager: EntityManager) => Promise<T>,
): Promise<T> {
  return (await getDatabase()).mongoManager.transaction(runInTransaction);
}
