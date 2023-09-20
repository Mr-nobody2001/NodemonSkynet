// Chat Gpt Api
const createTextResponder = require("../services/apiService/text/createTextResponse");
const textResponder = createTextResponder();

// Eden labs Api
const createAudioResponder = require("../services/apiService/audio/createAudioResponse");
let audioResponder;

// Database
const getPersona = require("../services/databaseService/PersonaDAO");

// Send a chat message and return audio
exports.chat = async (req, res, next) => {
  try {
    if (!audioResponder) {
      const err = new Error(`Error: persona is not defined.`);
      throw err;
    }

    //onst textResponse = await textResponder(req.body);
    const urlAudioResponse = await audioResponder(/*textResponse*/"hi");

    res.status(200).send(urlAudioResponse);
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
    audioResponder = createAudioResponder(persona);
    await textResponder(req.body, persona);
    res.status(200).send("Successfully chosen persona");
  } catch (error) {
    next(error);
    res.status(error.status || 500).send(error.message);
  }
};

exports.pageNotFound = (req, res) => res.status(404).send("Pape not found");

module.exports = exports;
