import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";

import {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
} from "../controllers/client.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createClient);
router.get("/", authMiddleware, getClients);
router.get("/:id", authMiddleware, getClientById);
router.put("/:id", authMiddleware, updateClient);
router.delete("/:id", authMiddleware, deleteClient);

export default router;