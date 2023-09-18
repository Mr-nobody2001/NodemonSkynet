const NationalityModel = (sequelize, Model, DataTypes) => {
  return class Nationality extends Model {
    static init() {
      super.init(
        {
          nationalityName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [4, 64],
            },
          },
        },
        { sequelize, modelName: "nationality", tableName: "nationality" }
      );
    }
  };
};

module.exports = NationalityModel;
