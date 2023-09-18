const ProfessionModel = (sequelize, Model, DataTypes) => {
  return class Profession extends Model {
    static init() {
      super.init(
        {
          professionName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [8, 64],
            },
          },
        },
        { sequelize, modelName: "profession", tableName: "profession" } // Alterado o nome da tabela para "profession"
      );
    }
  };
};

module.exports = ProfessionModel;