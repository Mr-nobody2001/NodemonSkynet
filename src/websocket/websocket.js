import { serverHttp, io } from "../../config/server/serverConfig.js";
import ErrorMessage from "../models/error/ErrorMessage.js";
import instantiateModules from "../services/ws-service/chatInstantiateHandler.js";
import getChat from "../services/ws-service/getChat.js";

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

    socket.on("send chat", (msg) => {
      getChat(textResponder, audioResponder, socket, msg);
    });

  } catch (error) {
    console.error(error.stack);
    const errorMessage = new ErrorMessage(error);
    socket.emit("error", errorMessage);
  }
});
