const callAudioApi = require("./callAudioApi");

const createAudio = (persona) => {
  const personaClosure = { ...persona };
  return async (responseText = "") => {
    try {
      console.log(callAudioApi)
      return callAudioApi(personaClosure, responseText);
    } catch (error) {
      const err = new Error(`Error when calling the Eden API: (${error})`);
      throw err;
    }
  };
};

module.exports = createAudio;
