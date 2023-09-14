const createAudio = (prompt) => {
  try {
    const voice = require("elevenlabs-node");

    const apiKey = "2f2d4d428e6e64fa378fab33718882e2";
    const voiceID = "wAPDB1xN1ysXcG1LhxGM";
    const fileName = "./audio/audio.mp3";
    const modelID = "eleven_multilingual_v1";

    console.log(prompt);

    voice.textToSpeech(apiKey, voiceID, fileName, prompt, undefined, undefined, modelID);
  } catch (error) {
    throw new Error(`Erro ao chamar a API do ChatGPT: ${error}`)
  }
};

module.exports = createAudio;
