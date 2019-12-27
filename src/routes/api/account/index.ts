import { Router } from "express";
import * as joi from "joi";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { validateAuth, TokenPayload } from "../../../middleware/auth";
import { validateQuery } from "../../../middleware/validate";
import User, { UserSchema } from "../../../models/User";
import { signToken, createError, verifyToken, sha512Hash, genRandomString } from "../../../utils";

const router = Router();

router.get("/check", validateQuery({ token: joi.string().required() }), async (req, res) => {
  const { token } = req.query;
  try {
    const payload = verifyToken(token) as TokenPayload;
    if (payload) {
      const user = await User.findById(payload.userId).exec();
      if (!user) res.status(200).send({ valid: false });
      else res.status(200).send({ valid: true, userId: payload.userId, role: user.role });
    } else res.status(200).send({ valid: false });
  } catch (e) {
    res.status(200).send({ valid: false });
  }
});

const authSchema: joi.SchemaMap = {
  username: joi.string().required(),
  password: joi.string().required()
};
router.get("/auth", validateQuery(authSchema), async (req, res, next) => {
  const { username, password } = req.query;

  User.findOne({ "account.username": username })
    .exec()
    .then(async user => {
      if (!user) return next(createError(400, "invalid username or password"));
      const correct = await bcrypt.compare(password, user.account.password);
      if (!correct) return next(createError(400, "invalid username or password"));

      const token = signToken({ userId: user.id });
      res.status(200).send({ token, role: user.role, userId: user.id });
    })
    .catch(next);

  // // Бекдор для админа
  // if (username === "admin" && password === "1488") {
  //   const token = jwt.sign({ userId: "admin" }, process.env.APP_PRIVATE_KEY);
  //   return res.status(200).send(token);
  // } else res.status(400).send();
});

const createSchema: joi.SchemaMap = {
  role: joi
    .string()
    .only(["admin", "user"])
    .required(),
  username: joi.string().required(),
  password: joi.string().required(),
  firstname: joi.string().required(),
  lastname: joi.string().required(),
  middlename: joi.string().required(),
  dob: joi
    .string()
    .regex(/^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/)
    .required()
};
router.post("/create", validateAuth("admin"), validateQuery(createSchema), async (req, res, next) => {
  const { username, password, firstname, lastname, middlename, dob, role } = req.query;
  const [day, month, year] = dob.split(".").map(v => Number(v));
  const data: UserSchema = {
    account: {
      username,
      password: await bcrypt.hash(password, 10) //sha512Hash(password, genRandomString(10)).passwordHash
    },
    profile: {
      firstname,
      lastname,
      middlename,
      dob: new Date(year, month, day)
    },
    role
  };

  const isExists = (await User.find({ "account.username": username }).exec()).length !== 0;
  if (isExists) return next(createError(422, "user already exists"));

  const user = new User(data);

  user
    .save()
    .then(() => res.status(201).send())
    .catch(next);

  // const token = signToken({ userId: user.id, role });
});

export default router;
