const PersonaHObbieModel = (sequelize) => {
  const PersonaHobbie = sequelize.define("personaHobbie", {});

  return PersonaHobbie;
};

module.exports = PersonaHObbieModel;