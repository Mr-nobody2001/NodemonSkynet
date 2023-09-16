const PersonaModel = (Sequelize, sequelize) => {
  const Persona = sequelize.define("persona", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],
      },
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 150],
      },
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 21,
        max: 100,
      },
    },
    profession: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 150],
      },
    },
    nationality: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 255],
      },
    },
    birthplace: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 255],
      },
    },
    maritalStatus: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],
      },
    },
    dateOfBirth: {
      type: Sequelize.DATEONLY, // Use DATEONLY to store only the date of birth
      allowNull: false,
    },
    lifeSummary: {
      type: Sequelize.TEXT,
    },
    apiIDVoice: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 150],
      },
    },
  });

  return Persona;
};

module.exports = PersonaModel;
