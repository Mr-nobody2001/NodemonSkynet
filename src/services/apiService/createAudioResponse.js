const createAudio = (voiceID) => {
  const voice = voiceID;
  return (responseText) => {
    try {
      const elevenlabsLibrary = require("elevenlabs-node");

      const apiKey = "0853230ce17b946cf302fe227f069fa5";
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
      throw new Error(`Error when calling the ElevenLabs API: ${error}`);
    }
  };
};

module.exports = createAudio;
