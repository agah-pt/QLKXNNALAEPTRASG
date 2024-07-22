import { Request, Response, Router } from 'express';
import { ReportModelUtils } from '../../models/report.model';
import { TransactionsRepository } from '../../data/transactions.repository';

const router = Router();

router.get('/:account_id/:year/:month', async (req: Request, res: Response) => {
    try {

        const accountId = req.params["account_id"];
        const year = req.params["year"];
        const month = req.params["month"];

        const account = await new TransactionsRepository().getAccountMonthlyReport(accountId, +year, +month)

        if (account) {
            const result = ReportModelUtils.fromMonthlyReportEntities(accountId, +year, +month, account)
            res.status(200).json(result);
        } else {
            res.status(404);
        }
    } catch (error) {
        console.error('An error ocurred:', error);
        res.status(500).json(error);
    }
});

export default router;