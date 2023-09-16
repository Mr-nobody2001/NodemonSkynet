const personaController = require("../controllers/personaController");
const express = require("express");
const router = express.Router();

router.post("/random", personaController.randomResponse);

router.post("/roleplay", personaController.roleplayResponse);

module.exports = router;