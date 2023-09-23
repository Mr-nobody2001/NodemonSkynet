import batchCall from "./batchCall.js";

const getChat = async (textResponder, audioResponder, socket, msg) => {
  const { completion, chatContext } = await textResponder(undefined, msg);

  const chunkList = [];
  const isSymbol = /[.!?]/g;
  const isNotEmpty = /^\s*$/;
  const chatContextConcat = [];

  for await (let chunk of completion) {
    if (chunk) {
      chunk = chunk.choices[0].delta.content;
      chunkList.push(chunk);

      if (isSymbol.test(chunk) && chunkList.length >= 20) {
        let responseText = chunkList.join("");
        chunkList.length = 0;
        await batchCall(
          socket,
          audioResponder,
          responseText,
          chatContextConcat
        );
      }
    }
  }

  if (chunkList.length != 0 && isNotEmpty.test(chunkList[0])) {
    let responseText = chunkList.join("");
    chunkList.length = 0;
    batchCall(socket, audioResponder, responseText, chatContextConcat);
  }

  // Insert textResponse in chatContext
  chatContext.push({ role: "system", content: chatContextConcat.join("") });

  if (chatContext.length > 15) chatContext.splice(1, 2);
};

export default getChat;
