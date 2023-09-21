import { serverHttp, io } from "../../config/server/serverConfig.js";
import ErrorMessage from "../models/error/ErrorMessage.js";
import { instantiateModules } from "./handler/chatPersonaHandler.js";
import { chatPersonaWsHandler } from "./handler/chatPersonaHandler.js";

io.on("connection", (socket) => {
  try {
    console.log("A user connected");

    instantiateModules();

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    serverHttp.on("error", (error) => {
      console.error("Error during server initialization:", error);
    });

    socket.on("send chat", (msg) => {
      chatPersonaWsHandler(msg);
    });
  } catch (error) {
    console.error(err.stack);
    const errorMessage = new ErrorMessage(err);
    socket.emit("error", errorMessage);
  }
});
