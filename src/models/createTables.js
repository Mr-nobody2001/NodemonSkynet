const databaseConnection = require("../../config/database/databaseConfig")
const PersonaModel = require("../../src/models/Persona");
const HobbieModel = require("../../src/models/Hobbie");
const PersonaHobbieModel = require("../../src/models/PersonaHobbie");

const Persona = PersonaModel(databaseConnection.Sequelize, databaseConnection.sequelize);
const Hobbie = HobbieModel(databaseConnection.Sequelize, databaseConnection.sequelize);
const PersonaHobbie = PersonaHobbieModel(databaseConnection.sequelize);

Persona.belongsToMany(Hobbie, { through: PersonaHobbie });
Hobbie.belongsToMany(Persona, { through: PersonaHobbie });

databaseConnection.sequelize
  .sync(/*{ force: false }*/)
  .then(() => {
    console.log("Database synchronized successfully");
  })
  .catch((error) => {
    console.error("Error synchronizing the database:", error);
  });
