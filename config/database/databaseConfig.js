// Instantiate the Sequelize ORM
const database = process.env.DATABASE;
const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;
const databaseInformations = {
  host: process.env.DATABASE_HOST,
  dialect: process.env.DATABASE_DIALECT,
  port: process.env.DATABASE_PORT,
};

try {
  const { Sequelize, Model, DataTypes } = require("sequelize");
  const sequelize = new Sequelize(
    database,
    username,
    password,
    databaseInformations
  );

  module.exports = { Sequelize: sequelize, Model: Model, DataTypes: DataTypes };
} catch (error) {
  throw new Error(`Error database initializing: (${error})`);
}

