const createTextResponder = () => {
  // Save the past questions and answers to keep context
  // Closure like
  const chatContext = [];

  const axios = require("axios");

  return async (inputText = "", changePersona = false) => {
    const apiKey = "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";
    const apiUrl = "https://api.openai.com/v1/chat/completions";

    if (changePersona) chatContext.length = 0;

    chatContext.push({ role: "user", content: inputText });

    let textResponse;

    //Making HTTP request to Chat Gpt API
    try {
      textResponse = await axios.post(
        apiUrl,
        {
          model: "gpt-3.5-turbo-0613",
          messages: chatContext,
          temperature: 0.7,
          max_tokens: 100,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      chatContext.push(textResponse.data.choices[0].message);

      if (chatContext.length > 10) {
        chatContext.splice(2, 2);
      }

    } catch (error) {
      throw new Error(`Error when calling the ChatGPT API: ${error}`);
    }

    return chatContext[chatContext.length - 1].content;
  };
};

module.exports = createTextResponder;
