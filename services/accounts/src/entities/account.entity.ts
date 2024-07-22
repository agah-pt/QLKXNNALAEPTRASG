import { Entity, ObjectId, ObjectIdColumn, Column } from "typeorm";
import { SupportedCurrencies } from "../models/gen";

@Entity()
export class AccountEntity {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column()
  accountId!: string;

  @Column()
  supportedCurrencies!: SupportedCurrencies[];
}
