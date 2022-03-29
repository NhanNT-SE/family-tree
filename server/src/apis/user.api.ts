import { Router } from "express";
import { body, query, check } from "express-validator";
import { validateRequest, requiredAuth, requireAdmin } from "../middleware";
import * as controller from "../controllers/user.controller";
import { Types } from "mongoose";
import { UserDto } from "../dto";
const router = Router();
router.get(
  "/api/users",
  requiredAuth,
  requireAdmin,
  [query("filter").isString().optional({ nullable: true })],
  validateRequest,
  controller.getUserList
);

router.post(
  "/api/users",
  requiredAuth,
  requireAdmin,
  [
    body("userList").isArray().withMessage("user list must be an array"),
    check("userList.*.id")
      .notEmpty()
      .custom((val) => {
        return Types.ObjectId.isValid(val);
      })
      .withMessage((val) => `${val} is not an valid ObjectId`),
    check("userList.*.username")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long")
      .custom((val, { req }) => {
        const usersList: UserDto[] = req.body.userList;
        const dupList: UserDto[] = usersList.filter(
          (e) => e.username === val
        );
        return dupList.length < 2;
      })
      .withMessage((val) => `username: ${val} duplicated in userList`),
    check("userList.*.email")
      .isEmail()
      .withMessage("Email must be valid")
      .custom((val, { req }) => {
        const usersList: UserDto[] = req.body.userList;
        const dupList: UserDto[] = usersList.filter(
          (e) => e.email === val
        );
        return dupList.length < 2;
      })
      .withMessage((val) => `email: ${val} duplicated in userList`),
    check("userList.*.bod").isDate(),
  ],
  validateRequest,
  controller.updateUsers
);

export { router as UserApis };
