import { serverHttp, io } from "../../config/server/serverConfig.js";
import ErrorMessage from "../models/error/ErrorMessage.js";
import instantiateModules from "./ws-handler/chatInstantiateHandler.js";

const batchCall = async (
  socket,
  audioResponder,
  chunkList,
  chatContextConcat
) => {
  let responseText = chunkList.join("");
  chatContextConcat.push(responseText);
  let responseAudio = await audioResponder(responseText);
  console.log(responseAudio);
  chunkList.length = 0;
  socket.emit("on response", { responseText, responseAudio });
};

io.on("connection", (socket) => {
  try {
    console.log("A user connected");

    const { textResponder, audioResponder } = instantiateModules();

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    serverHttp.on("error", (error) => {
      console.error("Error during server initialization:", error);
    });

    socket.on("send chat", async (msg) => {
      const { completion, chatContext } = await textResponder(undefined, msg);

      const chunkList = [];
      const isSymbol = /[.!?]/g;
      const isNotEmpty = /^\s*$/;
      const chatContextConcat = [];

      for await (let chunk of completion) {
        if (chunk) {
          chunk = chunk.choices[0].delta.content;
          chunkList.push(chunk);

          if (isSymbol.test(chunk) && chunkList.length >= 30) {
            batchCall(socket, audioResponder, chunkList, chatContextConcat);
          }
        }
      }

      if (chunkList.length != 0 && isNotEmpty.test(chunkList[0])) {
        batchCall(socket, audioResponder, chunkList, chatContextConcat);
      }

      // Insert textResponse in chatContext
      chatContext.push({ role: "system", content: chatContextConcat.join("") });

      if (chatContext.length > 15) chatContext.splice(1, 2);
    });
  } catch (error) {
    console.error(err.stack);
    const errorMessage = new ErrorMessage(err);
    socket.emit("error", errorMessage);
  }
});
