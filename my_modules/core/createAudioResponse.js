const createAudio = (inputText) => {
  try {
    const voice = require("elevenlabs-node");

    const apiKey = "2f2d4d428e6e64fa378fab33718882e2";
    const voiceID = "IKne3meq5aSn9XLyUdCD";
    const fileName = "./audio/audio.mp3";
    const modelID = "eleven_multilingual_v1";

    voice.textToSpeech(apiKey, voiceID, fileName, inputText, undefined, undefined, modelID);
  } catch (error) {
    throw new Error(`Erro ao chamar a API do ElevenLabs: ${error}`)
  }
};

module.exports = createAudio;
