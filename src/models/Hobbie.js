const HobbieModel = (sequelize, Model, DataTypes) => {
  return class Hobbie extends Model {
    static init() {
      super.init(
        {
          name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1, 50],
            },
          },
        },
        { sequelize, modelName: "hobbie", tableName: "hobbie" }
      );
    }
  }
};

export default HobbieModel;
