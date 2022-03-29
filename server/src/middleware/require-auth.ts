import { NextFunction, Request, Response } from "express";
import { CurrentUser } from "../dto";
import { verifyToken } from "../helpers";
import { UnauthorizedError, ForbiddenError } from "../errors";

export const requiredAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!process.env.COOKIE_TOKEN) {
    throw new UnauthorizedError();
  }
  const accessToken = req.cookies[process.env.COOKIE_TOKEN];

  if (!accessToken) {
    throw new UnauthorizedError();
  }
  const decoded = verifyToken(accessToken) as CurrentUser;
  req.currentUser = decoded;
  next();
};

export const requireAdmin = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new UnauthorizedError();
  }
  if (req.currentUser.permission < 2) {
    throw new ForbiddenError();
  }
  next();
};
