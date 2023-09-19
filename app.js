// Application entry point

// Express configuration
const express = require("express");
const app = express();
app.use(express.json());

// Centralized error handler
const errorHandler = require("errorhandler");
const { genaralConfig } = require("./config/general/generalConfig");
app.use(errorHandler());

// Routes
const personaRoutes = require("./src/routes/personaRoutes");
app.use("/persona", personaRoutes);

app.listen(genaralConfig.port, () => console.log(`Server running on port: ${genaralConfig.port}`));
