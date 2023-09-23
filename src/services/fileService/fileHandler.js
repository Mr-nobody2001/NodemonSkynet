import fs from "fs";

export const saveGlobalFile = (nomeArquivo, dados) => {
  fs.writeFileSync(nomeArquivo, JSON.stringify(dados), "utf-8");
};

export const fetchGlobalFile = (nomeArquivo) => {
  try {
    const dados = fs.readFileSync(nomeArquivo, "utf-8");
    return JSON.parse(dados);
  } catch (error) {
    const err = new Error(`Persona is not defined.`);
    err.message_details =
      "A conversation cannot be started without defining a persona";
    err.code = 500;
    throw err;
  }
};
