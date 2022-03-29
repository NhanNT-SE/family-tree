import { NextFunction, Response } from "express";
import { Request } from "express";
import { BaseError } from "../errors";
export const errorHandle = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  const { code } = err;
  if (code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).send({
      errors: [{ message: `${field}: ${err.keyValue[field]} already in use`, field }],
    });
  }
  console.error(err);
  return res.status(500).send({
    errors: [{ message: "Internal server error" }],
  });
};
