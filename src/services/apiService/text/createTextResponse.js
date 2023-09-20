const pickPersona = require("./pickPersona");

const callTextApi = require("./callTextApi");

const createTextResponder = () => {
  // Save the past questions and answers to keep context (context keeper)
  // Closure like
  const chatContext = [];
  return async (reqBody, persona) => {
    const { changePersona } = reqBody;

    if (changePersona) {
      pickPersona(chatContext, persona);
      return;
    }

    const { temperature, max_tokens, text } = reqBody;

    command = " (If it's not there, create a response.)";
    const inputText = text + command;

    // Insert inputText in chatContext
    chatContext.push({ role: "user", content: inputText });

    try {
      //Making HTTP request to Chat Gpt API
      const textResponse = await callTextApi(chatContext, temperature, max_tokens);

      // Insert textResponse in chatContext
      chatContext.push(textResponse.data.choices[0].message);

      if (chatContext.length > 15) chatContext.splice(1, 2);

      return chatContext[chatContext.length - 1].content.replace(/\n/g, " ");
    } catch (error) {
      throw error.status && error  || new Error(error);
    }
  };
};

module.exports = createTextResponder;
