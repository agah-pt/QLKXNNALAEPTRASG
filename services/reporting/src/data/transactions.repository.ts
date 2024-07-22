import { MongoRepository } from "typeorm"
import { MonthlyReportEntity } from "../entities/monthly-report.entity";
import { getRepository } from "./base.repository";
import { StatementTransaction, Transaction, UUID } from "../models/gen";

export class TransactionsRepository {

    async getRepository(): Promise<MongoRepository<MonthlyReportEntity>> {
        return getRepository(MonthlyReportEntity)
    }

    async addTransactionToStatement(accountId: UUID, transaction: Transaction) {
        const repository = await this.getRepository();

        const statementTransaction: StatementTransaction = {
            transactionId: transaction.transactionId,
            type: transaction.type,
            amount: transaction.amount,
            createdAt: transaction.createdAt,
        }

        const date = new Date(Date.parse(transaction.createdAt))

        return await repository.updateOne({ accountId, year: date.getFullYear(), month: date.getMonth(),   currency: transaction.currency }, {
            $push: {
                transactions: statementTransaction
            }
        }, {
            upsert: true
        })
    }

    async getAccountMonthlyReport(accountId: UUID, year: number, month: number): Promise<MonthlyReportEntity[]> {

        const repository = await this.getRepository();

        const reports = await repository.find({
            where: {
                accountId,
                month,
                year
            },
            order: {
                currency: "ASC"
            }
        })

        return reports;
    }

}