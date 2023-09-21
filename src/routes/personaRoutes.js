import {
  getPersona,
  pageNotFound,
} from "../controllers/personaController.js";
import express from "express";

const router = express.Router();

// Choose a persona
router.get("/getPersona/:personaId", getPersona);

// Handles 404 error
router.get("*", pageNotFound);

export default router;
