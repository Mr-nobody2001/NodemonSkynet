// Application entry point
import { serverHttp } from "./config/server/serverConfig.js";
import { config } from "dotenv";

config();

const port = process.env.PORT;

// Routes
//const personaRoutes = require("./src/routes/personaRoutes");
//app.use("/persona", personaRoutes);

serverHttp.listen(port, () => console.log(`Server running on port: ${port}`));
