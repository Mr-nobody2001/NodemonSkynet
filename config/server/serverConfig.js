import express from "express";
import http from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import cors from "cors";
import { httpCorsConfiguration } from "./corsConfig.js"
import { websocketCorsConfiguration } from "./corsConfig.js";

const app = express();

// CORS configuration
app.use(cors(httpCorsConfiguration));

app.use(express.json());

// Error logging
app.use(morgan("combined"));

// Routes
import routes from "../../src/routes/personaRoutes.js";
app.use("/persona", routes);

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, websocketCorsConfiguration);

export { serverHttp, io };
