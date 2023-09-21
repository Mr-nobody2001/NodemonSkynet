const LanguageModel = (sequelize, Model, DataTypes) => {
  return class Language extends Model {
    static init() {
      super.init(
        {
          languageName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1, 8],
            },
          },
        },
        { sequelize, modelName: "language", tableName: "language" } // Altere o nome da tabela para "language"
      );
    }
  };
};

export default LanguageModel;
