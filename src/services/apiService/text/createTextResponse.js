import definePersona from "./definePersona.js";
import callTextApi from "./callTextApi.js";

const createTextResponder = () => {
  // Save the past questions and answers to keep context (context keeper)
  // Closure like
  const chatContext = [];
  return async (persona, msg) => {
    if (persona) {
      definePersona(chatContext, persona);
      return;
    }

    const { max_tokens, text } = msg;
    const command = " (If it's not there, create a response.)";
    const inputText = text + command;
    const model = undefined;
    const temperature = undefined;

    // Insert inputText in chatContext
    chatContext.push({ role: "user", content: inputText });

    try {
      //Making HTTP request to Chat Gpt API
      const completion = await callTextApi(
        chatContext,
        model,
        temperature,
        max_tokens
      );

      return { completion, chatContext };
    } catch (err) {
      throw (err.status && err) || new Error(` ${err}`);
    }
  };
};

export default createTextResponder;
