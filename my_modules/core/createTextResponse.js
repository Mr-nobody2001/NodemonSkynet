const createGptApiCall = () => {
  // Save the past questions to keep context
  // Closure like
  const chatContext = [];

  const axios = require("axios");

  return async (inputText = "") => {
    const apiKey = "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";

    const apiUrl = "https://api.openai.com/v1/chat/completions";

    chatContext.push({ role: "user", content: inputText });

    let response;

    //Making HTTP request
    try {
      response = await axios.post(
        apiUrl,
        {
          model: "gpt-3.5-turbo-0613",
          messages: chatContext,
          temperature: 0.7,
          max_tokens: 50,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      chatContext.push(response.data.choices[0].message);

      if (chatContext.length > 10) {
        chatContext.splice(0, 2);
      }
    } catch (error) {
      throw new Error(`Erro ao chamar a API do ChatGPT: ${error}`);
    }

    return chatContext[chatContext.length - 1].content;
  };
};

module.exports = createGptApiCall;
