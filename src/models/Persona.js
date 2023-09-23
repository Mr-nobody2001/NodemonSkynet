const PersonaModel = (Sequelize, sequelize, Model, DataTypes) => {
  return class Persona extends Model {
    static init() {
      super.init(
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
          },
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
          background: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
          personality: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
          physicalDescription: {
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
