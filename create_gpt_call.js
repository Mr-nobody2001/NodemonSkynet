const criarCall = () => {
  const context = [];

  const axios = require("axios");

  // Chave da API do ChatGPT
  return async (inputText = "") => {
    const apiKey = "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";

    // Endpoint da API do ChatGPT
    const apiUrl = "https://api.openai.com/v1/chat/completions";

    context.unshift({ role: "user", content: inputText });

    let response;

    try {
      response = await axios.post(
        apiUrl,
        {
          model: "gpt-3.5-turbo-0613",
          messages: context,
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
    } catch (error) {
      console.error("Erro ao chamar a API do ChatGPT:", error);
    }

    context.unshift(response.data.choices[0].message);

    if (context.length > 7) {
      context.pop();
    }

    return context[0].content;
  };
};

module.exports = criarCall;
