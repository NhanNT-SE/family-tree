import { Router } from "express";
import { body } from "express-validator";
import { validateRequest, requiredAuth } from '../middleware'
import * as controller from '../controllers/auth.controller'
const router = Router();

router.post(
  "/api/auth/sign-in",
  [
    body("username")
      .isLength({ min: 4 })
      .withMessage("must be at least 5 chars long"),
    body("password")
      .isLength({ min: 4 })
      .withMessage("must be at least 5 chars long"),
  ],
  validateRequest,
  controller.signIn
);

router.post(
  "/api/auth/sign-out",
  controller.signOut
);

router.get(
  "/api/auth/current-user",
  requiredAuth,
  controller.currentUser
);

export { router as AuthApis };
