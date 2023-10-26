import responseStatus from "../../../config/enum/responseStatus.js";

const batchCall = async (
  socket,
  audioResponder,
  responseText,
  chatContextConcat
) => {
  chatContextConcat.push(responseText);
  let responseAudio = await audioResponder(responseText);

  socket.emit("on response", {
    status: responseStatus.SENDING,
    responseText,
    responseAudio,
  });
};

export default batchCall;
