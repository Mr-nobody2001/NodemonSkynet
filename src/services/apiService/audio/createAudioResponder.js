import callAudioApi from "./callAudioApi.js";

const createAudioResponder = (persona) => {
  const personaClosure = { ...persona };
  return async (responseText = "") => {
    try {
      return callAudioApi(personaClosure, responseText);
    } catch (error) {
      throw error.status && error || new Error(` ${error}`);
    }
  };
};

export default createAudioResponder;
