import sls from "serverless-http";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import "express-async-errors";
import { AuthApis, UserApis, FamilyTreeApis } from "./apis";
import { db } from "./db-connection";
import { CurrentUser } from "./dto";
import "./env";
import { NotFoundError } from "./errors";
import { errorHandle } from "./middleware";
import { ProfileModel, UserModel } from "./models";

declare global {
  namespace Express {
    interface Request {
      currentUser?: CurrentUser;
    }
  }
}

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public"));

app.use(UserApis);
app.use(AuthApis);
app.use(FamilyTreeApis);

app.use(async (_req, _res) => {
  throw new NotFoundError();
});

app.use(errorHandle);

(async () => {
  try {
    await db.connect();
    Promise.all([UserModel.dummyData(), ProfileModel.initDataDefault()]);
  } catch (error) {
    console.error(`${error}`);
  }
})();

if (process.env.NODE_ENV === "local") {
  app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
}
module.exports.handler = sls(app);
