// Instantieta the Sequelize ORM
const database = "persona_database";
const username = "postgres";
const password = "123";
const databaseInformations = {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
};

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  database,
  username,
  password,
  databaseInformations
);

module.exports = { Sequelize: Sequelize, sequelize: sequelize };
