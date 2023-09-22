const definePersona = (chatContext, persona) => {
    // Clears the array when a new persona is choosen
    chatContext.length = 0;
  
    const command =
      "Now you're going to play the role of" +
      ` a person named ${persona.name}. However,` +
      " you shouldn't reveal that you're" +
      " assuming this persona. The relevant" +
      " details for the interpretation are in" +
      " the following JSON:";
  
    const inputText = command + JSON.stringify(persona);
  
    // Insert inputText in chatContext
    chatContext.push({ role: "system", content: inputText });
  };
  
export default definePersona;