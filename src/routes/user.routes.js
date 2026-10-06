import express from "express";
import {
  createUser,
  loginUser,
  getUsers,
  getCurrentUser
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  createUser
);

router.post("/login", loginUser);

router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getUsers
);
router.get("/me", authMiddleware, getCurrentUser);

router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getUsers
);

router.get("/me", authMiddleware, getCurrentUser);

export default router;
