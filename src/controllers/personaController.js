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
  const { inputText } = req.body;
  const command = "(invent a response.)";

  try {
    inputText += command;
    const textResponse = await textResponder(false, inputText);
    audioResponder(textResponse);
    res.status(201).send("Audio created successfully");
  } catch (error) {
    next(error);
    res.status(error.status || 500).send(error.message);
  }
};

// Send a persona and return audio
exports.getPersona = async (req, res, next) => {
  const { personaId, max_tokens } = req.body;
  const command =
    "Now you're going to play the role of" +
    "a person named Edward. However," +
    "you shouldn't reveal that you're" +
    "assuming this persona. The relevant" +
    "details for the interpretation are in" +
    "the following JSON:";

  try {
    // Pick a persona
    const persona = await getPersona(personaId);
    audioResponder = createAudioResponder(persona);
    const inputText = command + JSON.stringify(persona);
    const textResponse = await textResponder(true, inputText, max_tokens);
    const audioResponse = await audioResponder(textResponse);
    res.status(200).redirect(audioResponse);
  } catch (error) {
    next(error);
    res.status(error.status || 500).send(error.message);
  }
};

exports.pageNotFound = (req, res) => res.status(404).send("Pape not found");

module.exports = exports;
