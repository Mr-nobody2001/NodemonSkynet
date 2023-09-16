const express = require("express");
const app = express();
const port = 8081;

app.use(express.json());

const personaRoutes = require("./src/routes/personaRoutes");

app.use("/api", personaRoutes);

app.listen(port, () => console.log(`Server running on port: ${port}`));
