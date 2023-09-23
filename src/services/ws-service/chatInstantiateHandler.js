import { fetchGlobalFile } from "../../services/fileService/fileHandler.js";
import createTextResponder from "../../services/apiService/text/createTextResponse.js";
import createAudioResponder from "../../services/apiService/audio/createAudioResponder.js";

const instantiateModules = () => {
  try {
    const path = "./files/persona.json";

    const persona = fetchGlobalFile(path);

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
