const BirthplaceModel = (sequelize, Model, DataTypes) => {
  return class Birthplace extends Model {
    static init() {
      super.init(
        {
          cityName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1, 64],
            },
          },
        },
        { sequelize, modelName: "birthplace", tableName: "birthplace" }
      );
    }
  };
};

module.exports = BirthplaceModel;
