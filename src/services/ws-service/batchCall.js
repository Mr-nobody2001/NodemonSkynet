const batchCall = async (
    socket,
    audioResponder,
    responseText,
    chatContextConcat
  ) => {
    chatContextConcat.push(responseText);
    let responseAudio = await audioResponder(responseText);
    console.log(responseAudio);
    socket.emit("on response", { responseText, responseAudio });
  };

  export default batchCall;