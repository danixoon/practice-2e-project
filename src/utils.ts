import * as jwt from "jsonwebtoken";
import * as crypto from "crypto";
import { TokenPayload } from "middleware/auth";

export const createError = (status: number, message?: string): Error & { status: number } => {
  return Object.assign(new Error(message), { status });
};

export const signToken = (payload: TokenPayload) => {
  const token = jwt.sign(payload, process.env.APP_PRIVATE_KEY);
  return token;
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.APP_PRIVATE_KEY);
};

export const genRandomString = (length: number) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex") /** convert to hexadecimal format */
    .slice(0, length); /** return required number of characters */
};

export const sha512Hash = (password: string, salt: string) => {
  var hash = crypto.createHmac("sha512", salt); /** Hashing algorithm sha512 */
  hash.update(password);
  var value = hash.digest("hex");
  return {
    salt: salt,
    passwordHash: value
  };
};


