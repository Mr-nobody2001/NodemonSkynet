import { fetchGlobalFile } from "../../services/fileService/fileHandler.js";

import createTextResponder from "../../services/apiService/text/createTextResponse.js";
const textResponder = createTextResponder();

//import createAudioResponder from "../services/apiService/audio/createAudioResponse.js";
//let audioResponder;

export const instantiateModules = async () => {
  const path = "./files/persona.json";

  const persona = fetchGlobalFile(path);

  try {
    if (!persona) {
      const err = new Error(`Persona is not defined.`);
      err.message_details =
        "A conversation cannot be started without defining a persona";
      err.code = 500;
      throw err;
    }

    await textResponder(persona.dataText);
  } catch (err) {
    throw err;
  }
};

export const chatPersonaWsHandler = async (msg) => {
  try {
    textResponder(undefined, msg);
  } catch (err) {
    throw err;
  }
};