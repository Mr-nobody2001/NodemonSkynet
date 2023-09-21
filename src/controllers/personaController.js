import { getPersonaById } from "../dao/PersonaDAO.js";
import ErrorMessage from "../models/error/ErrorMessage.js";
import { saveGlobalFile } from "../services/fileService/fileHandler.js";

export const getPersona = async (req, res) => {
  const personaId = req.params.personaId;
  try {
    // Pick a persona
    const persona = await getPersonaById(personaId);

    if (!persona) {
      const err = new Error(`Persona cannot be defined.`);
      err.status = 400;
      throw err;
    }

    const fileName = "./files/persona.json";

    saveGlobalFile(fileName, persona);

    res.status(200).send("Successfully chosen persona");
  } catch (err) {
    console.error(err.stack);
    const errorMessage = new ErrorMessage(err);
    res.status(err.code || 500).send(errorMessage);
  }
};

export const pageNotFound = (req, res) =>
  res.status(404).send("Page not found");
