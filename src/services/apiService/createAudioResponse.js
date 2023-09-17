const createAudio = (persona) => {
  const personaClosure = persona;
  return async (responseText = "a") => {
    try {
      const axios = require("axios").default;
      const apiKey = require("../../../config/api/apiKeys").edenAiApiKey;

      const options = {
        method: "POST",
        url: "https://api.edenai.run/v2/audio/text_to_speech",
        headers: {
          authorization: `Bearer ${apiKey}`,
        },
        data: {
          show_original_response: false,
          fallback_providers: "",
          providers: "microsoft",
          language: "pt-BR",
          text: responseText,
          option: "FEMALE",
          audio_format: "mp3",
        },
      };

      const provider = options.data.providers;

      const audioResponse = await axios.request(options);

      return audioResponse.data[provider].audio_resource_url;
    } catch (error) {
      const err = new Error(`Error when calling the Eden API: (${error})`);
      throw err;
    }
  };
};

module.exports = createAudio;
