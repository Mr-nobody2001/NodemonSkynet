const personaController = require("../controllers/personaController");
const express = require("express");
const router = express.Router();

router.get("/audio", personaController.getAudio)

router.post("/chat", personaController.chat);

router.post("/persona", personaController.getPersona);

module.exports = router;