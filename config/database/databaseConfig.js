// Instantiate the Sequelize ORM
const database = "persona_database";
const username = "postgres";
const password = "123";
const databaseInformations = {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
};

const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  database,
  username,
  password,
  databaseInformations
);

module.exports = { Sequelize: sequelize, Model: Model, DataTypes: DataTypes };
