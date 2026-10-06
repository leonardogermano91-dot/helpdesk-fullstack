import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";

import {
  createContract,
  getContracts,
  getContractById,
  updateContract,
  deleteContract
} from "../controllers/contract.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createContract);
router.get("/", authMiddleware, getContracts);
router.get("/:id", authMiddleware, getContractById);
router.put("/:id", authMiddleware, updateContract);
router.delete("/:id", authMiddleware, deleteContract);
export default router;