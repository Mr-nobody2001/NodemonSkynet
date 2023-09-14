const voice = require("elevenlabs-node");

const apiKey = "2f2d4d428e6e64fa378fab33718882e2"; // Your API key from Elevenlabs
const voiceID = "pNInz6obpgDQGcFmaJgB"; // The ID of the voice you want to get

const voiceResponse = voice.getModels(apiKey).then((res) => {
  console.log(res);
});