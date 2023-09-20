const {
  textApiDefaultValues,
} = require("../../../../config/defaultValues/defaultValues");

const callTextApi = async (
  chatContext,
  model = textApiDefaultValues.modelDefault,
  temperature = textApiDefaultValues.temperatureDefault,
  max_tokens = textApiDefaultValues.max_tokens_default
) => {
  const OpenAI = require("openai");

  const openai = new OpenAI({ apiKey: process.env.CHAT_GPT_API_KEY });

  const completion = await openai.chat.completions.create({
    model: model,
    messages: chatContext,
    temperature: temperature,
    max_tokens: max_tokens,
    stream: true,
  });

  for await (const chunk of completion) {
    console.log(chunk.choices[0].delta.content);
  }
};

module.exports = callTextApi;
