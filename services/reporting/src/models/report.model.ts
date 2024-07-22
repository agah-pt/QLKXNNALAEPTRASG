import { MonthlyReportEntity } from "../entities/monthly-report.entity";
import { MonthlyReport, UUID } from "./gen";

export class ReportModelUtils {
    static fromMonthlyReportEntities(accountId: UUID, year: number, month: number, item: MonthlyReportEntity[]): MonthlyReport {
        return item.reduceRight<MonthlyReport>((prev, curr) => {

            // Small protection so we know we are using the correct data
            if (curr.accountId != prev.accountId ||
                curr.year != prev.year ||
                curr.month != prev.month
            ) {
                throw new Error("Mismatched data")
            }

            prev.currencies.push(
                {
                    currency: curr.currency,
                    transactions: curr.transactions,
                }
            )

            return prev;
        }, {
            accountId,
            year,
            month,
            currencies: []
        })
    }
}
