// Chat Gpt Api
const createTextResponder = require("../services/apiService/text/createTextResponse");
const textResponder = createTextResponder();

// Eden labs Api
const createAudioResponder = require("../services/apiService/audio/createAudioResponse");
let audioResponder;

// Database
const getPersona = require("../services/databaseService/PersonaDAO");

const ErrorMessage = require("../models/error/ErrorMessage");

// Send a chat message and return audio
exports.chat = async (req, res, next) => {
  try {
    if (!audioResponder) {
      const err = new Error(`Persona is not defined.`);
      err.message_details = "A conversation cannot be started without defining a persona"
      err.status = 500;
      throw err;
    }

    const textResponse = await textResponder(req.body);
    //const urlAudioResponse = await audioResponder(textResponse);

    res.status(200).send(urlAudioResponse);
  } catch (error) {
    const errorMessage = new ErrorMessage(error)

    next(error);

    res.status(error.status || 500).send(errorMessage);
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

    if (!persona || !audioResponder) {
      const err = new Error(`Persona can´t not be defined.`);
      err.status = 400;
      throw err;
    }

    res.status(200).send("Successfully chosen persona");
  } catch (error) {
    const errorMessage = new ErrorMessage(error);

    next(error);

    res.status(error.status || 500).send(errorMessage);
  }
};

exports.pageNotFound = (req, res) => res.status(404).send("Page not found");

module.exports = exports;
