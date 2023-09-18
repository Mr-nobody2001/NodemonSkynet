const {
  Sequelize,
  Model,
  DataTypes,
} = require("../../config/database/databaseConfig");

const PersonaModel = require("../../src/models/Persona");
const HobbieModel = require("../../src/models/Hobbie");
const PersonaHobbieModel = require("../../src/models/PersonaHobbie");
const NationalityModel = require("../../src/models/Nationality");
const LanguageModel = require("../../src/models/Language");
const ProfessionModel = require("../../src/models/Profession");
const BirthplaceModel = require("../../src/models/Birthplace");
const MaritalStatusModel = require("../../src/models/MaritalStatus");
const VoiceModel = require("../../src/models/Voice");

const Persona = PersonaModel(Sequelize, Model, DataTypes);
const Hobbie = HobbieModel(Sequelize, Model, DataTypes);
const PersonaHobbie = PersonaHobbieModel(Sequelize, Model, DataTypes);
const Nationality = NationalityModel(Sequelize, Model, DataTypes);
const Language = LanguageModel(Sequelize, Model, DataTypes);
const Profession = ProfessionModel(Sequelize, Model, DataTypes);
const Birthplace = BirthplaceModel(Sequelize, Model, DataTypes);
const MaritalStatus = MaritalStatusModel(Sequelize, Model, DataTypes);
const Voice = VoiceModel(Sequelize, Model, DataTypes);

Persona.init();
Hobbie.init();
PersonaHobbie.init();
Nationality.init();
Language.init();
Profession.init();
Birthplace.init();
MaritalStatus.init();
Voice.init();

(async () => {
  Persona.belongsToMany(Hobbie, { through: PersonaHobbie });
  Hobbie.belongsToMany(Persona, { through: PersonaHobbie });
  Persona.belongsTo(Nationality, { foreignKey: "nationalityId" });
  Persona.belongsTo(Language, { foreignKey: "languageId" });
  Persona.belongsTo(Profession, { foreignKey: "professionId" });
  Persona.belongsTo(Birthplace, { foreignKey: "birthplaceId" });
  Persona.belongsTo(MaritalStatus, { foreignKey: "maritalStatusId" });
  Persona.belongsTo(Voice, { foreignKey: "voiceId" });

  /*await Sequelize.sync({ force: true });

  const hobbie1 = await Hobbie.create({
    name: "Story telling",
  });

  const hobbie2 = await Hobbie.create({
    name: "FIshing",
  });

  const hobbie3 = await Hobbie.create({
    name: "Outdoor sports",
  });

  const nationality1 = await Nationality.create({
    nationalityName: "British",
  });

  const language1 = await Language.create({
    languageName: "en",
  });

  const profession1 = await Profession.create({
    professionName: "War Veteran",
  });

  const birthplace1 = await Birthplace.create({
    cityName: "London",
  });

  const maritalStatus1 = await MaritalStatus.create({
    status: "Widower",
  });

  const persona1 = await Persona.create({
    name: "Edward",
    lastName: "Smith",
    age: 95,
    gender: "M",
    dateOfBirth: "1928-05-10",
    lifeSummary:
      "Edward Smith is a British World War II veteran whose parents lost their lives during a bombing raid during the conflict. Additionally, Edward suffered injuries that resulted in the loss of vision in one of his eyes when he was hit by shrapnel during the war.",
    apiIDVoice: "IKne3meq5aSn9XLyUdCD",
    nationalityId: nationality1.id,
    languageId: language1.id,
    professionId: profession1.id,
    birthplaceId: birthplace1.id,
    maritalStatusId: maritalStatus1.id,
  });

  const personaHobbie1 = await PersonaHobbie.create({
    personaId: persona1.id,
    hobbieId: hobbie1.id,
  });

  const personaHobbie2 = await PersonaHobbie.create({
    personaId: persona1.id,
    hobbieId: hobbie2.id,
  });

  const personaHobbie3 = await PersonaHobbie.create({
    personaId: persona1.id,
    hobbieId: hobbie3.id,
  });*/

  const persona = await Persona.findByPk(1, {
    include: [
      { model: Nationality, as: "nat" },
      { model: Language, as: "lang" },
      { model: Profession, as: "prof" },
      { model: Birthplace, as: "bp" },
      { model: MaritalStatus, as: "ms" },
      { model: Voice, as: "voic" },
      {
        model: Hobbie,
        through: PersonaHobbie,
      },
    ],
  });

  console.log(persona.dataValues);
})();

/*const voice = await Voice.create({
  name: "Edward's Voice",
  provider: language.id,
});*/
