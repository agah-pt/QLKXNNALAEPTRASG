import { Entity, ObjectId, ObjectIdColumn, Column } from "typeorm";
import { SupportedCurrencies } from "../models/gen";

@Entity()
export class AccountCurrencyBalanceEntity {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column()
  accountId!: string;

  @Column()
  currency!: SupportedCurrencies;

  @Column()
  balance!: number;
}
