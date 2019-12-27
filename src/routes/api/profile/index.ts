import { Router } from "express";
import { validateAuth } from "../../../middleware/auth";
import { signToken, createError } from "../../../utils";
import * as joi from "joi";
import { validateQuery } from "../../../middleware/validate";
import User from "../../../models/User";

const router = Router();

const getUserSchema: joi.SchemaMap = {
  userId: joi.string()
};

router.get("/", validateAuth("user", "admin"), validateQuery(getUserSchema), async (req, res, next) => {
  const { id } = req.params as any;
  const user = await User.findById(id).exec();
  if (!user) next(createError(404, "user doesn't exists"));

  res.status(200).send(user.profile);
});

export default router;
