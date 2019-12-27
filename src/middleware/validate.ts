import { RequestHandler } from "express";
import * as joi from "joi";
import { createError } from "../utils";

export const validateQuery: (schemaMap: joi.SchemaMap) => RequestHandler = schemaMap => (req, res, next) => {
  const schema = joi.object().keys(schemaMap);
  const result = schema.validate(req.query);

  if (result.error) next(createError(400, result.error.details[0].message));
  else next();
};

//  validateQuery;
