const callApi = async (personaClosure, responseText = "") => {
  const axios = require("axios").default;
  const apiKey = require("../../../config/api/apiKeys").edenAiApiKey;

  const {
    "voice.provider": provider,
    "voice.name": model,
    "language.languageName": language,
  } = personaClosure;

  const gender = personaClosure.gender === "M" ? "MALE" : "FEMALE";

  const options = {
    method: "POST",
    url: "https://api.edenai.run/v2/audio/text_to_speech",
    headers: {
      authorization: `Bearer ${apiKey}`,
    },
    data: {
      response_as_dict: true, // Default value
      attributes_as_list: false, // Default value
      show_original_response: false, // Default value
      settings: { provider: model },
      rate: 0, // Default value
      pitch: 0, // Default value
      volume: 100,
      sampling_rate: 0,
      providers: provider, // Default value
      fallback_providers: null, // Default value
      language: language,
      audio_format: null, // Default value
      text: responseText,
      option: gender,
    },
  };

  return await axios.request(options);
};

const createAudio = (persona) => {
  const personaClosure = { ...persona };
  return async (responseText = "a") => {
    try {
      return callApi(personaClosure, responseText);
    } catch (error) {
      const err = new Error(`Error when calling the Eden API: (${error})`);
      throw err;
    }
  };
};

module.exports = createAudio;
