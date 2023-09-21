const VoiceModel = (sequelize, Model, DataTypes) => {
  return class Voice extends Model {
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
          provider: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1, 128],
            },
          },
        },
        { sequelize, modelName: "voice", tableName: "voice" }
      );
    }
  };
};

export default VoiceModel;
