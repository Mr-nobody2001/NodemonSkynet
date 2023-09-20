const {
  audioApiDefaultValues,
} = require("../../../../config/defaultValues/defaultValues");

const callAudioApi = async (
  personaClosure,
  responseText = audioApiDefaultValues.textResponseDefault
) => {
  const sdk = require("api")("@eden-ai/v2.0#3qia2ulmrhn2r5");

  const apiKey = process.env.EDEN_API_KEY;

  const {
    "voices.provider": provider,
    "voices.name": model,
    "language.languageName": language,
  } = personaClosure;

  const gender = personaClosure.gender === "M" ? "MALE" : "FEMALE";

  sdk.auth(apiKey);
  
  const audioResponse = await sdk
    .audio_text_to_speech_create({
      response_as_dict: audioApiDefaultValues.response_as_dict_default,
      attributes_as_list: audioApiDefaultValues.attributes_as_list_default,
      show_original_response:
        audioApiDefaultValues.show_original_response_default,
      settings: { [provider]: model },
      rate: personaClosure["voices.personaVoice.pitch"],
      pitch: personaClosure["voices.personaVoice.rate"],
      volume: audioApiDefaultValues.volume_default,
      sampling_rate: audioApiDefaultValues.sampling_rate_default,
      providers: provider,
      fallback_providers: audioApiDefaultValues.fallback_providers_default,
      language: language,
      audio_format: audioApiDefaultValues.audio_format_default,
      text: responseText,
      option: gender,
    })

  return (await axios.request(options)).data[provider].audio_resource_url;
};

module.exports = callAudioApi;
