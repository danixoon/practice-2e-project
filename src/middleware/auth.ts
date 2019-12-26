import { RequestHandler } from "express";
import * as jwt from "jsonwebtoken";
import { createError } from "../utils";

interface TokenPayload {
  userId: string;
}

const handler: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization;
  if (token === undefined) next(new Error("token required"));
  try {
    const { userId } = jwt.verify(token, process.env.APP_PRIVATE_KEY) as TokenPayload;
    req.params.userId = userId;
    next();
  } catch (e) {
    next(createError(new Error("invalid token"), 403));
  }
};

export default handler;
