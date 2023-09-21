import { Sequelize, Model, DataTypes } from "sequelize";
import { config } from "dotenv";

config();

// Carrega as variáveis de ambiente
const database = process.env.DATABASE;
const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;
const databaseInformations = {
  host: process.env.DATABASE_HOST,
  dialect: process.env.DATABASE_DIALECT,
  port: process.env.DATABASE_PORT,
};

let sequelize;

try {
  sequelize = new Sequelize(database, username, password, databaseInformations);
} catch (error) {
  throw new Error(`Erro ao inicializar o banco de dados: (${error})`);
}

export { sequelize, Model, DataTypes };
