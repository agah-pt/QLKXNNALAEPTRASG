import {
  Entity,
  ObjectId,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
} from "typeorm";
import { SupportedCurrencies, TransactionType } from "../models/gen";

@Entity()
export class AccountCurrencyTransactionEntity {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column()
  accountId!: string;

  @Column()
  transactionId!: string;

  @Column()
  currency!: SupportedCurrencies;

  @Column()
  type!: TransactionType;

  @Column()
  amount!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
