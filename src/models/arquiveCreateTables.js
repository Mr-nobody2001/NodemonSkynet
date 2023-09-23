import dotEnv from "dotenv";
dotEnv.config();

import {
  Sequelize,
  sequelize,
  Model,
  DataTypes,
} from "../../config/database/databaseConfig.js";

import PersonaModel from "../../src/models/Persona.js";
import HobbieModel from "../../src/models/Hobbie.js";
import PersonaHobbieModel from "../../src/models/PersonaHobbie.js";
import NationalityModel from "../../src/models/Nationality.js";
import LanguageModel from "../../src/models/Language.js";
import ProfessionModel from "../../src/models/Profession.js";
import BirthplaceModel from "../../src/models/Birthplace.js";
import MaritalStatusModel from "../../src/models/MaritalStatus.js";
import VoiceModel from "../../src/models/Voice.js";
import PersonaVoiceModel from "../../src/models/PersonaVoice.js";

const Persona = PersonaModel(Sequelize, sequelize, Model, DataTypes);
const Hobbie = HobbieModel(sequelize, Model, DataTypes);
const PersonaHobbie = PersonaHobbieModel(sequelize, Model, DataTypes);
const Nationality = NationalityModel(sequelize, Model, DataTypes);
const Language = LanguageModel(sequelize, Model, DataTypes);
const Profession = ProfessionModel(sequelize, Model, DataTypes);
const Birthplace = BirthplaceModel(sequelize, Model, DataTypes);
const MaritalStatus = MaritalStatusModel(sequelize, Model, DataTypes);
const Voice = VoiceModel(sequelize, Model, DataTypes);
const PersonaVoice = PersonaVoiceModel(sequelize, Model, DataTypes);

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

(async () => {
  Persona.belongsToMany(Hobbie, { through: PersonaHobbie });
  Hobbie.belongsToMany(Persona, { through: PersonaHobbie });
  Persona.belongsTo(Nationality, { foreignKey: "nationalityId" });
  Persona.belongsTo(Language, { foreignKey: "languageId" });
  Persona.belongsTo(Profession, { foreignKey: "professionId" });
  Persona.belongsTo(Birthplace, { foreignKey: "birthplaceId" });
  Persona.belongsTo(MaritalStatus, { foreignKey: "maritalStatusId" });
  Persona.belongsToMany(Voice, { through: PersonaVoice });
  Voice.belongsToMany(Persona, { through: PersonaVoice });
  Voice.belongsTo(Language, { foreignKey: "languageId" });

  await sequelize.sync({ force: true });

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
    languageName: "en-gb",
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

  const voice1 = await Voice.create({
    name: "en-GB_JamesV3Voice",
    provider: "ibm",
    languageId: language1.id
  });

  const persona1 = await Persona.create({
    name: "Edward",
    lastName: "Smith",
    age: 95,
    gender: "M",
    dateOfBirth: "1928-05-10",
    background:
      "Edward Smith is a British World War II veteran whose parents lost their lives during a bombing raid during the conflict. Additionally, Edward suffered injuries that resulted in the loss of vision in one of his eyes when he was hit by shrapnel during the war.",
    apiIDVoice: "IKne3meq5aSn9XLyUdCD",
    nationalityId: nationality1.id,
    languageId: language1.id,
    professionId: profession1.id,
    birthplaceId: birthplace1.id,
    maritalStatusId: maritalStatus1.id,
    personality:
      "Edward is a wise and calm man with a positive outlook on life despite the adversities he faced during the war. He is known for his emotional stories about his youth and experiences during World War II. Edward is generous and has a big heart, often sharing his life experiences with others.",
    physicalDescription:
      "Edward is an elderly man with white hair and a well-trimmed beard. He has a gentle and serene look in his eyes and usually wears comfortable and casual clothing, such as sweaters and trousers.",
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
  });

  const personaVoice1 = await PersonaVoice.create({
    personaId: persona1.id,
    voiceId: voice1.id,
    rate: -25,
    pitch: -25,
  });
})();
