const callApi = async (chatContext, temperature = 0.7, max_tokens = 128) => {
  const axios = require("axios");
  const apiKey = require("../../../config/api/apiKeys").chatGptApiKey;
  const apiUrl = "https://api.openai.com/v1/chat/completions";

  const textResponse = await axios.post(
    apiUrl,
    {
      model: "gpt-3.5-turbo-0613",
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

const createTextResponder = () => {
  // Save the past questions and answers to keep context (context keeper)
  // Closure like
  const chatContext = [];

  return async (reqBody, persona) => {
    const { temperature, max_tokens, changePersona, text } = reqBody;

    let inputText;

    // Clears the array when a new persona is choosen
    if (changePersona) {
      chatContext.length = 0;
      const command =
        "Now you're going to play the role of" +
        `a person named ${persona.name}. However,` +
        "you shouldn't reveal that you're" +
        "assuming this persona. The relevant" +
        "details for the interpretation are in" +
        "the following JSON:";

      delete persona["voice.name"];
      delete persona["voice.provider"];

      inputText = command + text + JSON.stringify(persona);
    } else {
      command = "(invent a response.)";
      inputText = command + text;
    }

    // Insert inputText in chatContext
    chatContext.push({ role: "user", content: inputText });

    try {
      //Making HTTP request to Chat Gpt API
      const textResponse = await callApi(chatContext, temperature, max_tokens);

      // Insert textResponse in chatContext
      chatContext.push(textResponse.data.choices[0].message);

      if (chatContext.length > 10) {
        chatContext.splice(2, 2);
      }
      return chatContext[chatContext.length - 1].content;
    } catch (error) {
      const err = new Error(`Error when calling the ChatGPT API: (${error})`);
      throw err;
    }
  };
};

module.exports = createTextResponder;
