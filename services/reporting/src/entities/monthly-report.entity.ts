import { Entity, ObjectId, ObjectIdColumn, Column } from "typeorm"
import { StatementTransaction, SupportedCurrencies } from "../models/gen";

@Entity()
export class MonthlyReportEntity {

    @ObjectIdColumn()
    _id!: ObjectId

    @Column()
    accountId!: string;

    @Column()
    year!: number;

    @Column()
    month!: number;

    @Column()
    currency!: SupportedCurrencies
    
    @Column()
    transactions!: StatementTransaction[];
    
}