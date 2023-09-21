import {
  chat,
  getPersonaHandler,
  pageNotFound,
} from "../controllers/personaController.js";
import express from "express";

const router = express.Router();

// Send a chat message
router.get("/chat", chat);

// Choose a persona
router.get("/pick", getPersonaHandler);

// Handles 404 error
router.get("*", pageNotFound);

export default router;
