const express = require("express");
const app = express();
const port = 8081;
const errorHandler = require('errorhandler');

app.use(express.json());

// Centralized error handler
app.use(errorHandler());

const personaRoutes = require("./src/routes/personaRoutes");

app.use("/persona", personaRoutes);

app.listen(port, () => console.log(`Server running on port: ${port}`));
