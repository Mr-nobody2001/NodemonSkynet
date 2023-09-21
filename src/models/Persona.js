const PersonaModel = (sequelize, Model, DataTypes) => {
  return class Persona extends Model {
    static init() {
      super.init(
        {
          name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [2, 32],
            },
          },
          lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [2, 64],
            },
          },
          age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
              min: 21,
              max: 100,
            },
          },
          gender: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1, 1],
            },
          },
          dateOfBirth: {
            type: DataTypes.DATEONLY,
            allowNull: false,
          },
          lifeSummary: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
        },
        { sequelize, modelName: "persona", tableName: "persona" }
      );
    }
  };
};

export default PersonaModel;
