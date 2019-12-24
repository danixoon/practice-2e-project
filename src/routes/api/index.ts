import { Router } from "express";
import * as jwt from "jsonwebtoken";
import auth from "../../middleware/auth";

const router = Router();

router.get("/auth", (req, res) => {
  res.status(200).send();
});

if (process.env.NODE_ENV === "development")
  router.get("/token", (req, res) => {
    const token = jwt.sign({ userId: "test-user" }, process.env.APP_PRIVATE_KEY);
    res.status(200).send(token);
  });

router.get("/test", auth, (req, res) => {
  res.status(200).send(req.params);
});

export default router;
