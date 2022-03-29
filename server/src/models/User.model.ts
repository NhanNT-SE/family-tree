import { Schema, model, Model } from "mongoose";
import { UserDto } from "../dto";

interface UserModel extends Model<UserDto> {
  dummyData(): Promise<void>;
}

const schema = new Schema<UserDto, UserModel>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    bod: { type: Date, required: true },
  },
  {
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

schema.static("dummyData", async function dummyData() {
  const count = await this.estimatedDocumentCount();
  if (count === 0) {
    await fillDummyData();
  }
});

export const UserModel = model<UserDto, UserModel>("User", schema);

const fillDummyData = async (): Promise<void> => {
  const dummyData: UserDto[] = [
    { username: "user-01", email: "user-01@testmail.com", bod: "1991-01-01" },
    { username: "user-02", email: "user-02@testmail.com", bod: "1992-02-02" },
    { username: "user-03", email: "user-03@testmail.com", bod: "1993-03-03" },
    { username: "user-04", email: "user-04@testmail.com", bod: "1994-04-04" },
    { username: "user-05", email: "user-05@testmail.com", bod: "1995-05-05" },
    { username: "user-06", email: "user-06@testmail.com", bod: "1996-06-06" },
    { username: "user-07", email: "user-07@testmail.com", bod: "1997-07-07" },
    { username: "user-08", email: "user-08@testmail.com", bod: "1998-08-08" },
    { username: "user-09", email: "user-09@testmail.com", bod: "1999-09-09" },
  ];

  const promiseList = dummyData.map(
    async (e) =>
      await UserModel.findOneAndUpdate(e, { $set: e }, { upsert: true })
  );

  await Promise.all(promiseList);
};
