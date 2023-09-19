const pickPersona = (chatContext, persona) => {
  // Clears the array when a new persona is choosen
  chatContext.length = 0;

  const command =
    "Now you're going to play the role of" +
    `a person named ${persona.name}. However,` +
    "you shouldn't reveal that you're" +
    "assuming this persona. The relevant" +
    "details for the interpretation are in" +
    "the following JSON:";

  // Delete internal usage data from persona json
  delete persona["voice.name"];
  delete persona["voice.provider"];
  delete persona["language.languageName"];
  delete persona["voices.personaVoice.rate"];
  delete persona["voices.personaVoice.pitch"];
  delete persona["voices.provider"];
  delete persona["voices.personaVoice.voiceId"];
  delete persona["voices.personaVoice.personaId"];
  delete persona["voices.name"];

  inputText = command + JSON.stringify(persona);

  // Insert inputText in chatContext
  chatContext.push({ role: "system", content: inputText });
};

module.exports = pickPersona;
