// Chat Gpt Api
const createTextResponder = require("../services/apiService/createTextResponse");
const textResponder = createTextResponder();

// Eden labs Api
const createAudioResponder = require("../services/apiService/createAudioResponse");
let audioResponder;

// Database
const getPersona = require("../services/databaseService/PersonaDAO");

// Send a chat message and return audio
exports.chat = async (req, res, next) => {
  try {
    const textResponse = await textResponder(req.body);
    //audioResponder(textResponse);
    res.status(200).send(/*"Audio created successfully"*/textResponse);
  } catch (error) {
    next(error);
    res.status(error.status || 500).send(error.message);
  }
};

// Send a persona and return audio
exports.getPersona = async (req, res, next) => {
  const { personaId } = req.body;
  req.body.changePersona = true;
  try {
    // Pick a persona
    const persona = await getPersona(personaId);
    //audioResponder = createAudioResponder(persona);
    //const textResponse = await textResponder(req.body, persona);
    //const audioResponse = await audioResponder(/*textResponse*/);
    res.status(200).send(persona);
  } catch (error) {
    next(error);
    res.status(error.status || 500).send(error.message);
  }
};

exports.pageNotFound = (req, res) => res.status(404).send("Pape not found");

module.exports = exports;
