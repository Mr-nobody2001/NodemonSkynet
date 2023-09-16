const createAudio = (responseText) => {
  try {
    const elevenlabsLibrary = require("elevenlabs-node");

    const apiKey = "2f2d4d428e6e64fa378fab33718882e2";
    const voiceID = "IKne3meq5aSn9XLyUdCD";
    const fileName = "./audio/audio.mp3";
    const stability = undefined;
    const similarityBoost = undefined;
    const modelID = "eleven_multilingual_v1";

    elevenlabsLibrary.textToSpeech(
      apiKey,
      voiceID,
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

module.exports = createAudio;
