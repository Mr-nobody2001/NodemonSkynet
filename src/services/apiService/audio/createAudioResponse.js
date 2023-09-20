const callAudioApi = require("./callAudioApi");

const createAudio = (persona) => {
  const personaClosure = { ...persona };
  return async (responseText = "") => {
    try {
      return callAudioApi(personaClosure, responseText);
    } catch (error) {
      throw error.status && error || new Error(` ${error}`);
    }
  };
};

module.exports = createAudio;
