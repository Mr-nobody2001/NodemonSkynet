import express from "express";
import http from "http";
import { Server } from "socket.io";
import morgan from "morgan";

const app = express();
app.use(express.json());

const serverHttp = http.createServer(app);

const io = new Server(serverHttp);

// Error logging
app.use(morgan("combined"));

// Routes
import routes from "../../src/routes/personaRoutes.js";
app.use("/persona", routes);

// Teste
app.get("/", (req, res) => {
  res.sendFile("/home/gabriel/Documentos/neo-skynet/src/views/index.html");
});
//

export { serverHttp, io };
