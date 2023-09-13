const express = require("express");
const app = express();

app.use(express.json());

const createCall = require("./create_gpt_call");
const call = createCall();

app.post("/api/call", async (req, res) => {
  const prompt = await call(req.body.inputText);
  res.send(prompt);
});

app.listen(3333);
