import { UserDto, CreateUserResponse } from "../dto";
import { UserModel } from "../models";

export class UserService {
  async createUser(user: UserDto): Promise<CreateUserResponse> {
    const newUser = new UserModel({ ...user });
    await newUser.save();

    return {
      id: newUser.id!,
      ...user,
    };
  }

  async getUserList(query: string): Promise<UserDto[]> {
    const userList = await UserModel.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    });
    return userList;
  }

  async updateUser(userList: UserDto[]) {
    const promiseList = userList.map(async (e) => {
      return await UserModel.findByIdAndUpdate(e.id!, {
        username: e.username,
        email: e.email,
        bod: e.bod,
      });
    });
    await Promise.all(promiseList)
  }
}
