import {
  EntityManager,
  EntityTarget,
  MongoEntityManager,
  MongoRepository,
  ObjectLiteral,
} from "typeorm";
import { getDatabase } from "../datasource";

export async function getRepository<Entity extends ObjectLiteral>(
  target: EntityTarget<Entity>,
  entityManager: EntityManager | undefined,
): Promise<MongoRepository<Entity>> {
  if (entityManager) {
    return entityManager.getMongoRepository(target);
  }

  const database = await getDatabase();
  return database.getMongoRepository(target);
}

export async function getManager(): Promise<MongoEntityManager> {
  const database = await getDatabase();
  return database.mongoManager;
}
