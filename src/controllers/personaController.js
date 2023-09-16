// Chat Gpt Api
const createTextResponder = require("../services/apiService/createTextResponse");
const textResponder = createTextResponder();

// Eleven labs Api
const createAudio = require("../services/apiService/createAudioResponse");

// Database
const getPersona = require("../services/databaseService/UserDAO.js")

// Generate text and audio
exports.randomResponse = async (req, res) => {
  let textResponse;

  try {
    textResponse = await textResponder(req.body.inputText);
    createAudio(textResponse, false);
  } catch (error) {
    console.error(error);
  }

  res.send(textResponse);
};

exports.roleplayResponse = async (req, res) => {
  let textResponse;

  try {
    textResponse = await textResponder(req.body.inputText, true);
    const persona = getPersona();
    console.log(persona)
  } catch (error) {
    console.error(error);
  }

  res.send(textResponse);
};

module.exports = exports;
