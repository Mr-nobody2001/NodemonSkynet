const personaController = require("../controllers/personaController");
const express = require("express");
const router = express.Router();

// Send a chat message
router.get("/chat", personaController.chat);

// Choose a persona
router.get("/pick", personaController.getPersona);

// Handles 404 error
router.get("*", personaController.pageNotFound);

module.exports = router;
