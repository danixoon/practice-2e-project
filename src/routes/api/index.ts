import { Router } from "express";

import test from "./test";
import account from "./account";
import profile from "./profile";
import building from "./building";

const router = Router();

router.use("/account", account);
router.use("/profile", profile);
router.use("/building", building);

if (process.env.NODE_ENV === "development") router.use("/test", test);

export default router;
