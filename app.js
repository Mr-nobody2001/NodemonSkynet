// Application entry point
import { serverHttp } from "./config/server/serverConfig.js";
import { config as dotenv } from "dotenv";
import "./src/websocket/websocket.js"

dotenv();

const port = process.env.PORT;

serverHttp.listen(port, () => console.log(`Server running on port: ${port}`));
