import { Schema, model, Model } from "mongoose";
import { ProfileDto } from "../dto";
import { hashPassword } from "../helpers";

interface ProfileModel extends Model<ProfileDto> {
  initDataDefault(): Promise<void>;
}

const schema = new Schema<ProfileDto, ProfileModel>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  permission: { type: Number, required: true },
});

schema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const passHashed = await hashPassword(this.get("password"));
    this.set("password", passHashed);
  }
  done();
});

schema.static("initDataDefault", async function initDataDefault() {
  const count = await this.estimatedDocumentCount();
  if (count === 0) {
    await initData();
  }
});

export const ProfileModel = model<ProfileDto, ProfileModel>("Profile", schema);

const initData = async (): Promise<void> => {
  const dummyData: ProfileDto[] = [
    { username: "admin", password: "admin", permission: 2 },
    { username: "user", password: "user", permission: 1 },
  ];

  const promiseList = dummyData.map(async (e) => {
    let user = await ProfileModel.findOne(e);
    if (!user) {
      user = new ProfileModel(e);
      await user.save();
    }
  });

  await Promise.all(promiseList);
};
