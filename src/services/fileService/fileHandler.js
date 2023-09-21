import fs from "fs";

export const saveGlobalFile = (nomeArquivo, dados) => {
  fs.writeFileSync(nomeArquivo, JSON.stringify(dados), "utf-8");
};

export const fetchGlobalFile = (nomeArquivo) => {
  try {
    const dados = fs.readFileSync(nomeArquivo, "utf-8");
    return JSON.parse(dados);
  } catch (error) {
    console.error("Erro ao carregar o arquivo:", error);
    return null;
  }
};
