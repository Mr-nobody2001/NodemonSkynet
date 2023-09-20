const getPersona = async (personaId = 1) => {
  try {
    const {
      Sequelize,
      Model,
      DataTypes,
    } = require("../../../config/database/databaseConfig");

    const PersonaModel = require("../../models/Persona");
    const HobbieModel = require("../../models/Hobbie");
    const PersonaHobbieModel = require("../../models/PersonaHobbie");
    const NationalityModel = require("../../models/Nationality");
    const LanguageModel = require("../../models/Language");
    const ProfessionModel = require("../../models/Profession");
    const BirthplaceModel = require("../../models/Birthplace");
    const MaritalStatusModel = require("../../models/MaritalStatus");
    const VoiceModel = require("../../models/Voice");
    const PersonaVoiceModel = require("../../models/PersonaVoice");

    const Persona = PersonaModel(Sequelize, Model, DataTypes);
    const Hobbie = HobbieModel(Sequelize, Model, DataTypes);
    const PersonaHobbie = PersonaHobbieModel(Sequelize, Model, DataTypes);
    const Nationality = NationalityModel(Sequelize, Model, DataTypes);
    const Language = LanguageModel(Sequelize, Model, DataTypes);
    const Profession = ProfessionModel(Sequelize, Model, DataTypes);
    const Birthplace = BirthplaceModel(Sequelize, Model, DataTypes);
    const MaritalStatus = MaritalStatusModel(Sequelize, Model, DataTypes);
    const Voice = VoiceModel(Sequelize, Model, DataTypes);
    const PersonaVoice = PersonaVoiceModel(Sequelize, Model, DataTypes);

    Persona.init();
    Hobbie.init();
    PersonaHobbie.init();
    Nationality.init();
    Language.init();
    Profession.init();
    Birthplace.init();
    MaritalStatus.init();
    Voice.init();
    PersonaVoice.init();

    Persona.belongsToMany(Hobbie, { through: PersonaHobbie });
    Hobbie.belongsToMany(Persona, { through: PersonaHobbie });
    Persona.belongsTo(Nationality, { foreignKey: "nationalityId" });
    Persona.belongsTo(Language, { foreignKey: "languageId" });
    Persona.belongsTo(Profession, { foreignKey: "professionId" });
    Persona.belongsTo(Birthplace, { foreignKey: "birthplaceId" });
    Persona.belongsTo(MaritalStatus, { foreignKey: "maritalStatusId" });
    Persona.belongsToMany(Voice, { through: PersonaVoice });
    Voice.belongsToMany(Persona, { through: PersonaVoice });

    if (personaId <= 0) {
      const err = new Error(`Query error: invalid id`);
      err.status = 400;
      err.message_details = "Null or negative values ​​are not allowed";
      throw err;
    }

    const persona = await Persona.findByPk(personaId, {
      attributes: [
        "name",
        "lastName",
        "age",
        "gender",
        "dateOfBirth",
        "lifeSummary",
      ],
      raw: true,
      include: [
        { model: Nationality, attributes: ["nationalityName"] },
        { model: Language, attributes: ["languageName"] },
        { model: Profession, attributes: ["professionName"] },
        { model: Birthplace, attributes: ["cityName"] },
        { model: MaritalStatus, attributes: ["status"] },
        {
          model: Voice,
          through: {
            PersonaVoice,
            attributes: ["rate", "pitch"],
          },
          attributes: ["name", "provider"],
        },
      ],
    });

    if (!persona) {
      const err = new Error(`Query error: Persona not found`);
      err.status = 400;
      err.message_details =
        "The persona you are looking for does not exist in the database";
      throw err;
    }

    const hobbie = await Persona.findByPk(personaId, {
      attributes: [],
      raw: false,
      include: [
        {
          model: Hobbie,
          through: {
            PersonaHobbie,
            attributes: [],
          },
          attributes: ["name"],
          as: "hobbies",
        },
      ],
    });

    const hobbies = [];

    for (let i = 0; i < 3; i++) {
      hobbies.push(hobbie.dataValues.hobbies[i].name);
    }

    persona.hobbies = hobbies;

    return persona;
  } catch (error) {
    // If error.status true throw error if not throw a new error
    throw error.status && error || new Error(` ${error}`);
  }
};

module.exports = getPersona;
