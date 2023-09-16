const voice = require("elevenlabs-node");

const apiKey = "0853230ce17b946cf302fe227f069fa5"; // Your API key from Elevenlabs

voice.getVoices(apiKey).then((res) => {
  console.log(res);
});
