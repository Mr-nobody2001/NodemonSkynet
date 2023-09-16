const HobbieModel = (Sequelize, sequelize) => {
  const Hobbie = sequelize.define("hobbie", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],
      },
    },
  });

  return Hobbie;
};

module.exports = HobbieModel;
