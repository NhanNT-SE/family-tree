import { Router, Request, Response, NextFunction } from "express";
import multer from "multer";
import fs from "fs";
import { CustomError } from "../errors";
const router = Router();
const storageConf = multer.diskStorage({
  destination: function (_req, _file, callback) {
    callback(null, "src/public");
  },
  filename: function (_req, _file, callback) {
    callback(null, "family-tree.json");
  },
});
const fileSizeLimitErrorHandler = (
  err: any,
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (err) {
    console.log("first");
    throw new CustomError(
      "This file is too large to upload. The maximum supported file size are 3MB"
    );
  } else {
    next();
  }
};
const storage = multer({
  storage: storageConf,
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/json") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new CustomError("Only .json format allowed!"));
    }
  },
});

router.post(
  "/api/family-tree",
  storage.single("json"),
  fileSizeLimitErrorHandler,
  (_req: Request, res: Response) => {
    try {
      const dataRaw = fs.readFileSync(
        `${process.cwd()}/src/public/family-tree.json`
      );
      const data = JSON.parse(dataRaw.toString());
      if (!Array.isArray(data)) {
        throw new CustomError(
          "Data was not array. Please follow the correct format"
        );
      }
      fs.writeFileSync(
        "src/public/data/family-tree.json",
        JSON.stringify(data)
      );
      res.json(data);
    } catch (error: any) {
      if (error.name === "SyntaxError") {
        throw new CustomError("Invalid json");
      }
      throw error;
    }
  }
);
router.get("/api/family-tree", (_req, res) => {
  fs.readFile(
    `${process.cwd()}/src/public/data/family-tree.json`,
    (error, data) => {
      if (error) throw error;
      const student = JSON.parse(data.toString());
      return res.json(student);
    }
  );
});

export { router as FamilyTreeApis };
