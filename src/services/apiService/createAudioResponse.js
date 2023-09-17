const createAudio = (voiceID) => {
  const voice = voiceID;
  return (responseText) => {
    try {
      const elevenlabsLibrary = require("elevenlabs-node");
      const apiKey = require("../../../config/api/apiKeys").elevenlabsApiKey;
      const fileName = "./public/audio/audioResponse.mp3";
      const stability = undefined;
      const similarityBoost = undefined;
      const modelID = "eleven_multilingual_v1";

      elevenlabsLibrary.textToSpeech(
        apiKey,
        voice,
        fileName,
        responseText,
        stability,
        similarityBoost,
        modelID
      );
    } catch (error) {
      const err = new Error(`Error when calling the ElevenLabs API: (${error})`);
      err.status = 500;
      throw err;
    }
  };
};

module.exports = createAudio;
