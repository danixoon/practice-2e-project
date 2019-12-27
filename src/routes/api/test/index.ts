import { Router } from "express";
import * as joi from "joi";
import * as bcrypt from "bcrypt";
import { validateAuth } from "../../../middleware/auth";
import { signToken, createError } from "../../../utils";
import User, { UserSchema } from "../../../models/User";
import { validateQuery } from "../../../middleware/validate";

const router = Router();

router.get("/role/user", validateAuth("user"), (req, res) => {
  res.status(200).send();
});

router.get("/role/admin", validateAuth("admin"), (req, res) => {
  res.status(200).send();
});

router.get("/token/admin", async (req, res) => {
  const adminUser = await User.findOne({ "account.username": "admin" }).exec();
  const token = signToken({ userId: adminUser.id });

  res.status(200).send({ token });
});

router.post(
  "/admin",
  validateQuery({
    password: joi
      .string()
      .required()
      .min(3)
  }),
  async (req, res, next) => {
    const { password } = req.query;
    const adminUser = await User.findOne({ "account.username": "admin" }).exec();

    if (adminUser) return next(createError(422, "main admin already created"));

    const userDoc: UserSchema = {
      account: {
        username: "admin",
        password: await bcrypt.hash(password, 15)
      },
      profile: {
        firstname: "admin",
        lastname: "admin",
        middlename: "admin",
        dob: new Date()
      },
      role: "admin"
    };
    const user = await new User(userDoc).save();
    return res.status(200).send(user.toObject());
  }
);

export default router;
