import batchCall from "./batchCall.js";
import responseStatus from "../../../config/enum/responseStatus.js";

const firstResponse = async (socket) => {
  await socket.emit("on response", {
    status: responseStatus.START,
    responseText: undefined,
    responseAudio: undefined,
  });
};

const getChat = async (textResponder, audioResponder, socket, msg) => {
  const { completion, chatContext } = await textResponder(undefined, msg);

  const chunkList = [];
  const isSymbol = /[.!?]/g;
  const isNotEmpty = /^\s*$/;
  const chatContextConcat = [];
  let isFirst = true;

  for await (let chunk of completion) {
    if (chunk) {
      chunk = chunk.choices[0].delta.content;
      chunkList.push(chunk);

      if (isSymbol.test(chunk) && chunkList.length >= 15) {
        let responseText = chunkList.join("");
        chunkList.length = 0;

        if (isFirst) {
          firstResponse(socket);
        }

        isFirst = false;

        await batchCall(
          socket,
          audioResponder,
          responseText,
          chatContextConcat,
          isFirst
        );
      }
    }
  }

  if (chunkList.length != 0 && isNotEmpty.test(chunkList[0])) {
    let responseText = chunkList.join("");
    chunkList.length = 0;

    if (isFirst) {
      firstResponse(socket);
    }

    isFirst = false;

    await batchCall(socket, audioResponder, responseText, chatContextConcat);
  }

  socket.emit("on response", {
    status: responseStatus.DELIVERED,
    responseText: undefined,
    responseAudio: undefined,
  });

  // Insert textResponse in chatContext
  chatContext.push({ role: "system", content: chatContextConcat.join("") });

  if (chatContext.length > 15) chatContext.splice(1, 2);
};

export default getChat;
