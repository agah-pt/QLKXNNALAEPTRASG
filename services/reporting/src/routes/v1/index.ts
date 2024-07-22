import { Router } from 'express';

import reports from './reports.route';

const router = Router();

router.use('/reports', reports);

export default router;