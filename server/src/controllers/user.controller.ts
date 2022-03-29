import { Request, Response } from "express";
import { UserDto } from "../dto";
import { UserService } from "../services/user.service";

export const getUserList = async (
  req: Request,
  res: Response
) => {
  const filter = (req.query.filter as string) || ''
  const data = await new UserService().getUserList(filter)
  return res.json(data)
};

export const updateUsers = async (
  req: Request,
  res: Response
) => {
  const body: UserDto[] = req.body.userList || []
  await new UserService().updateUser(body)
  return res.end()
};
