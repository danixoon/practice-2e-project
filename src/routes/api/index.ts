import { Router } from "express";
import test from "./test";
import account from "./account";

const router = Router();

if (process.env.NODE_ENV === "development") router.use("/test", test);

router.use("/account", account);

export default router;
