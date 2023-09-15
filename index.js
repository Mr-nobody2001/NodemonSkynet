// Express configuration
const express = require("express");
const app = express();

app.use(express.json());

// Chat Gpt Api call
const createGptApiCall = require("./my_modules/core/createTextResponse");
const call = createGptApiCall();

// Eleven labs Api call
const createAudio = require("./my_modules/core/createAudioResponse");

// Generate text and audio
app.post("/api/call", async (req, res) => {
  let prompt;

  try {
    prompt = await call(req.body.inputText);
    createAudio(prompt);
  } catch (error) {
    console.error(error)
  }
 
  res.send(prompt);
});

app.listen(3333);
