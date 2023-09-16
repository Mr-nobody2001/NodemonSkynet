const getPersona = async (personaId = 1) => {
  const databaseConnection = require("../../../config/database/databaseConfig");

  const sqlQuery = `SELECT per.*, hob.name hobbies
        FROM personas per
        INNER JOIN "personaHobbies" ph
        ON per.id = ph."personaId"
        INNER JOIN hobbies hob
        ON ph."hobbieId" = hob.id
        Where per.id = :personaId;`;

  const valuesToReplace = {
    personaId: personaId,
  };

  const result = await databaseConnection.sequelize
    .query(sqlQuery, {
      replacements: valuesToReplace,
      type: databaseConnection.Sequelize.QueryTypes.SELECT,
    })
    .catch((error) => {
      throw new Error(`Query error ${error}`);
    });

  let hobbies = [];

  for (let res of result) {
    hobbies.push(res.hobbies);
  }

  result[0].hobbies = hobbies;

  return JSON.stringify((result[0].hobbies = hobbies));
};

module.exports = getPersona;
