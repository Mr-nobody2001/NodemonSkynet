// Chat Gpt Api
const createTextResponder = require("../services/apiService/createTextResponse");
const textResponder = createTextResponder();

// Eleven labs Api
const createAudioResponder = require("../services/apiService/createAudioResponse");
let audioResponder;

// Database
const getPersona = require("../services/databaseService/UserDAO");

exports.getAudio = (req, res) => {
  const audioFilePath =
    "/home/gabriel/Documentos/neo-skynet/public/audio/audioResponse.mp3";

  res.sendFile(audioFilePath);
};

// Generate text and audio
exports.chat = async (req, res) => {
  let { inputText } = req.body;
  const command = "(invent a response.)";

  try {
    inputText += command;
    const textResponse = await textResponder(inputText);
    //audioResponder(textResponse);
  } catch (error) {
    console.error(error);
  }
};

exports.getPersona = async (req, res) => {
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
    res.send("The persona has been successfully chosen!!!");
  } catch (error) {
    console.error(error);
  }
};

module.exports = exports;
