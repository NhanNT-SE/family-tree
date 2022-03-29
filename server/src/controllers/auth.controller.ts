import { ProfileModel } from "../models";
import { CustomError } from "../errors";
import {
  comparePassword,
  generateToken,
  setCookieToken,
  clearCookie,
} from "../helpers";
import { Request, Response } from "express";
import { CurrentUser } from "../dto";

export const signIn = async (req: Request, res: Response) => {
  const { username, password } = req.body as {
    username: string;
    password: string;
  };
  const profile = await ProfileModel.findOne({ username });
  if (!profile) {
    throw new CustomError("Invalid username or password");
  }
  const isValidPass = await comparePassword(password, profile.password);
  if (!isValidPass) {
    throw new CustomError("Invalid username or password");
  }

  const user: CurrentUser = {
    id: profile.id,
    username: profile.username,
    permission: profile.permission,
  };
  const token = generateToken(user);
  setCookieToken(res, token);

  return res.json(user);
};

export const signOut = async (_req: Request, res: Response) => {
  clearCookie(res);
  return res.end();
};

export const currentUser = async (req: Request, res: Response) => {
  const user = req.currentUser! ;
  return res.json(user);
};
