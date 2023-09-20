const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const errorHandler = require("errorhandler");

const app = express();
app.use(express.json());

// Centralized error handler
app.use(errorHandler());

const serverHttp = http.createServer(app);

const io = new Server(serverHttp);

module.exports = { serverHttp: serverHttp, io: io };
