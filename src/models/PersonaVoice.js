const PersonaVoiceModel = (sequelize, Model, DataTypes) => {
  return class PersonaVoice extends Model {
    static init() {
      super.init(
        {
          rate: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
              len: [-100, 100],
            },
          },
          pitch: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
              len: [-100, 100],
            },
          },
        },
        { sequelize, modelName: "personaVoice", tableName: "personaVoice" }
      );
    }
  };
};

module.exports = PersonaVoiceModel;
