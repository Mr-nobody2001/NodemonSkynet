import express from "express";
import http from "http";
import { Server } from "socket.io";
import errorHandler from "errorhandler";

const app = express();
app.use(express.json());

// Centralized error handler
app.use(errorHandler());

const serverHttp = http.createServer(app);

const io = new Server(serverHttp);

export { serverHttp, io };
