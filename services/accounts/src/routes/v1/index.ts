import { Router } from "express";

import accounts from "./accounts.route";

const router = Router();

router.use("/accounts", accounts);

export default router;
