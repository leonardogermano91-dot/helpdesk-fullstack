import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createPlan,
  getPlans,
  getPlanById,
  updatePlan,
  deletePlan
} from "../controllers/plan.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createPlan);
router.get("/", authMiddleware, getPlans);
router.get("/:id", authMiddleware, getPlanById);
router.put("/:id", authMiddleware, updatePlan);
router.delete("/:id", authMiddleware, deletePlan);

export default router;