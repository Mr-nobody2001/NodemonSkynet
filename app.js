// Application entry point
const { serverHttp } = require("./config/server/serverConfig");
const dotEnv = require("dotenv");

dotEnv.config();

const port = process.env.PORT;

// Routes
//const personaRoutes = require("./src/routes/personaRoutes");
//app.use("/persona", personaRoutes);

serverHttp.listen(port, () => console.log(`Server running on port: ${port}`));
