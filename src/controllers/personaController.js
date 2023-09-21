import createTextResponder from "../services/apiService/text/createTextResponse.js";
const textResponder = createTextResponder();

import createAudioResponder from "../services/apiService/audio/createAudioResponse.js";
let audioResponder;

import getPersona from "../services/databaseService/PersonaDAO.js";
import ErrorMessage from "../models/error/ErrorMessage.js";

// Send a chat message and return audio
export const chat = async (req, res, next) => {
  try {
    if (!audioResponder) {
      const err = new Error(`Persona is not defined.`);
      err.message_details =
        "A conversation cannot be started without defining a persona";
      err.status = 500;
      throw err;
    }

    await textResponder(req.body);

    res.status(200).send("ok");
  } catch (error) {
    const errorMessage = new ErrorMessage(error);

    next(error);

    res.status(error.status || 500).send(errorMessage);
  }
};

// Send a persona and return audio
export const getPersonaHandler = async (req, res, next) => {
  const { personaId } = req.body;
  req.body.changePersona = true;
  try {
    // Pick a persona
    const persona = await getPersona(personaId);
    audioResponder = createAudioResponder(persona);
    await textResponder(req.body, persona);

    if (!persona || !audioResponder) {
      const err = new Error(`Persona cannot be defined.`);
      err.status = 400;
      throw err;
    }

    res.status(200).send("Successfully chosen persona");
  } catch (error) {
    const errorMessage = new ErrorMessage(error);

    next(error);

    res.status(error.status || 500).send(errorMessage);
  }
};

export const pageNotFound = (req, res) => res.status(404).send("Page not found");
