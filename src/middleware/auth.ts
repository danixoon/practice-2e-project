import { RequestHandler } from "express";
import * as jwt from "jsonwebtoken";
import { createError } from "../utils";
import User, { UserRole } from "../models/User";

export interface TokenPayload {
  userId: string;
  // role: UserRole;
}

export const validateAuth: (...requiredRole: UserRole[]) => RequestHandler = requiredRole => async (req, res, next) => {
  const token = req.headers.authorization;
  if (token === undefined) next(createError(403, "token required"));
  try {
    const { userId } = jwt.verify(token, process.env.APP_PRIVATE_KEY) as TokenPayload;
    const user = await User.findById(userId).exec();
    if (!user || !requiredRole.includes(user.role)) return next(createError(403, "invalid token"));
    req.params.id = userId;
    return next();
  } catch (e) {
    return next(createError(403, "invalid token"));
  }
};

// export  validateAuth;
