const {
  audioApiDefaultValues,
} = require("../../../config/general/generalConfig");

const callApi = async (
  personaClosure,
  responseText = audioApiDefaultValues.textResponseDefault
) => {
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
      response_as_dict: audioApiDefaultValues.response_as_dict_default,
      attributes_as_list: audioApiDefaultValues.attributes_as_list_default,
      show_original_response:
        audioApiDefaultValues.show_original_response_default,
      settings: { provider: model },
      rate: personaClosure["voices.personaVoice.pitch"],
      pitch: personaClosure["voices.personaVoice.rate"],
      volume: audioApiDefaultValues.volume_default,
      sampling_rate: audioApiDefaultValues.rate_default,
      providers: provider,
      fallback_providers: audioApiDefaultValues.fallback_providers_default,
      language: language,
      audio_format: audioApiDefaultValues.audio_format_default,
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
