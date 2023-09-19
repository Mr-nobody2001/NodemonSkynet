const {
  textApiDefaultValues,
} = require("../../../../config/defaultValues/defaultValues");

const callTextApi = async (
  chatContext,
  model = textApiDefaultValues.modelDefault,
  temperature = textApiDefaultValues.temperatureDefault,
  max_tokens = textApiDefaultValues.max_tokens_default
) => {
  const axios = require("axios");
  const apiKey = process.env.CHAT_GPT_API_KEY;
  const apiUrl = "https://api.openai.com/v1/chat/completions";

  const textResponse = await axios.post(
    apiUrl,
    {
      model: model,
      messages: chatContext,
      temperature: temperature,
      max_tokens: max_tokens,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return textResponse;
};

module.exports = callTextApi;