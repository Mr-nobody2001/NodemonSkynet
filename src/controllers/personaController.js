// Chat Gpt Api
const createTextResponder = require("../services/apiService/createTextResponse");
const textResponder = createTextResponder();

// Eleven labs Api
const createAudioResponder = require("../services/apiService/createAudioResponse");
let audioResponder;

// Database
const getPersona = require("../services/databaseService/UserDAO");

exports.getAudio = (req, res, next) => {
  try {
    const audioFilePath =
      "/home/gabriel/Documentos/neo-skynet/public/audio/audioResponse.mp3";

    res.sendFile(audioFilePath);
  } catch (error) {
    next(error)
    res.status(404).send("Audio not found")
  }
};

// Generate text and audio
exports.chat = async (req, res, next) => {
  let { inputText } = req.body;
  const command = "(invent a response.)";

  try {
    inputText += command;
    const textResponse = await textResponder(inputText);
    //audioResponder(textResponse);
    res.status(201).send("Audio created successfully");
  } catch (error) {
    next(error);
    res.status(error.status).send(error.message);
  }
};

exports.getPersona = async (req, res, next) => {
  const { personaId } = req.body;
  let command;
  let inputText;

  try {
    command =
      "Now you're going to play the role of" +
      "a person named Edward. However," +
      "you shouldn't reveal that you're" +
      "assuming this persona. The relevant" +
      "details for the interpretation are in" +
      "the following JSON:";
    const persona = await getPersona(personaId);
    audioResponder = createAudioResponder(persona.apiIDVoice);
    inputText = command + JSON.stringify(persona);
    const textResponse = await textResponder(inputText, true);
    audioResponder(textResponse);
    res.status(200).send("The persona has been successfully chosen");
  } catch (error) {
    next(error);
    console.log(error.status);
    res.status(error.status).send(error.message);
  }
};

exports.pageNotFound = (req, res) => res.status(404);

module.exports = exports;
