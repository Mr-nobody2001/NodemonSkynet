import { fetchGlobalFile } from "../../services/fileService/fileHandler.js";
import createTextResponder from "../../services/apiService/text/createTextResponse.js";
import createAudioResponder from "../../services/apiService/audio/createAudioResponder.js";

const instantiateModules = () => {
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

    const textResponder = createTextResponder();
    textResponder(persona.dataText);
    const audioResponder = createAudioResponder(persona.dataAudio);

    return {
      textResponder,
      audioResponder,
    };
  } catch (err) {
    throw err;
  }
};

export default instantiateModules;
