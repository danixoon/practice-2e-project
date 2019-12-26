import { Router } from "express";
import * as joi from "joi";
import * as jwt from "jsonwebtoken";
import auth from "../../middleware/auth";
import { validateQuery } from "../../middleware/validate";

const router = Router();

router.get(
  "/auth",
  validateQuery({
    username: joi.string().required(),
    password: joi.string().required()
  }),
  (req, res) => {
    const { username, password } = req.query;
    // Бекдор для админа
    if (username === "admin" && password === "1488") {
      const token = jwt.sign({ userId: "admin" }, process.env.APP_PRIVATE_KEY);
      return res.status(200).send(token);
    } else res.status(400).send();
  }
);

router.get("/test", auth, (req, res) => {
  res.status(200).send();
});

export default router;
