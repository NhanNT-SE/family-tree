import { Response } from "express";
import jwt from "jsonwebtoken";
import { CurrentUser } from "../dto";
import { UnauthorizedError } from "../errors";

export const generateToken = (user: CurrentUser) => {
  try {
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: process.env.ACCESS_TOKEN_LIFE!,
    });
    return token;
  } catch (error) {
    throw error;
  }
};

export const verifyToken = (token: string) => {
  try {
    const verify = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    return verify;
  } catch (error: any) {
    throw new UnauthorizedError();
  }
};

export const setCookieToken = (res: Response, accessToken: string) => {
  res.cookie(process.env.COOKIE_TOKEN!, accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60,
  });
};

export const clearCookie = (res: Response) => {
  res.clearCookie(process.env.COOKIE_TOKEN!);
};
