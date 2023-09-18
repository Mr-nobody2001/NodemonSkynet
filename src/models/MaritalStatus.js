const MaritalStatusModel = (sequelize, Model, DataTypes) => {
    return class MaritalStatus extends Model {
      static init() {
        super.init(
          {
            status: {
              type: DataTypes.STRING, 
              allowNull: false,
              validate: {
                len: [1, 32], 
              },
            },
          },
          { sequelize, modelName: "maritalStatus", tableName: "maritalStatus" }
        );
      }
    }
  };

  module.exports = MaritalStatusModel;
  