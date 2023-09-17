const createTextResponder = () => {
  // Save the past questions and answers to keep context (context keeper)
  // Closure like
  const chatContext = [];

  const axios = require("axios");

  return async (changePersona = false, inputText = "", max_tokens = 128, temperature = 0.7) => {
    const apiKey = require("../../../config/api/apiKeys").chatGptApiKey;
    const apiUrl = "https://api.openai.com/v1/chat/completions";

    // Clears the array when a new persona is choosen
    if (changePersona) chatContext.length = 0;

    // Insert inputText in chatContext
    chatContext.push({ role: "user", content: inputText });

    let textResponse;

    //Making HTTP request to Chat Gpt API
    try {
      textResponse = await axios.post(
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
