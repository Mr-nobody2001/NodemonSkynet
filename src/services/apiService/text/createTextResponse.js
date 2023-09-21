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

    console.log(text, max_tokens);

    // Insert inputText in chatContext
    chatContext.push({ role: "user", content: inputText });

    console.log(chatContext)

    try {
      //Making HTTP request to Chat Gpt API
      const textResponse = await callTextApi(
        chatContext,
        model,
        temperature,
        max_tokens,
      );

      // Insert textResponse in chatContext
      chatContext.push(textResponse.data.choices[0].message);

      //if (chatContext.length > 15) chatContext.splice(1, 2);
    } catch (err) {
      throw (err.status && err) || new Error(` ${err}`);
    }
  };
};

export default createTextResponder;
