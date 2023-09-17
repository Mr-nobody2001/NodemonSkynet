const jsonFormatter = (result) => {
  let hobbies = [];

  for (let res of result) {
    hobbies.push(res.hobbies);
  }

  result[0].hobbies = hobbies;

  return result[0];
};

const getPersona = async (personaId = 1) => {
  const databaseConnection = require("../../../config/database/databaseConfig");

  const sqlQuery = `SELECT p.*, h.name hobbies
        FROM personas p
        INNER JOIN "personaHobbies" ph
        ON p.id = ph."personaId"
        INNER JOIN hobbies h
        ON ph."hobbieId" = h.id
        Where p.id = :personaId;`;

  const valuesToReplace = {
    personaId: personaId,
  };

  const result = await databaseConnection.sequelize
    .query(sqlQuery, {
      replacements: valuesToReplace,
      type: databaseConnection.Sequelize.QueryTypes.SELECT,
    })
    .catch((error) => {
      throw new Error(`Query error: ${error}`);
    });

  if (!result[0]){
    const err = new Error(`Query error: persona not found`);
    err.status = 400;
    throw err;
  }

  return jsonFormatter(result);
};

module.exports = getPersona;
