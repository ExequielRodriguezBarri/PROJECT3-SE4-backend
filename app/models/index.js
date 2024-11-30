const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.user = require("./user.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.resume = require("./resume.model.js")(sequelize, Sequelize);
db.education = require("./education.model.js")(sequelize, Sequelize);
db.experience = require("./experience.model.js")(sequelize, Sequelize);
db.links = require("./links.model.js")(sequelize, Sequelize);
db.awards = require("./awards.model.js")(sequelize, Sequelize);
db.interest = require("./interests.model.js")(sequelize, Sequelize);
db.projects = require("./projects.model.js")(sequelize, Sequelize);
db.skill = require("./skill.model.js")(sequelize, Sequelize);
db.contactInfo = require("./contactInfo.model.js")(sequelize, Sequelize);

// 1. User and Resume (One-to-Many)
db.user.hasMany(db.resume, { as: "resumes", foreignKey: { allowNull: false }, onDelete: "CASCADE" });
db.resume.belongsTo(db.user, { as: "user", foreignKey: { allowNull: false }, onDelete: "CASCADE" });

// 2. User and Other Tables (One-to-Many)
[db.education, db.experience, db.links, db.awards, db.contactInfo, db.interest, db.projects, db.skill].forEach((model) => {
  db.user.hasMany(model, { as: model.name, foreignKey: { allowNull: false }, onDelete: "CASCADE" });
  model.belongsTo(db.user, { as: "user", foreignKey: { allowNull: false }, onDelete: "CASCADE" });
});

// 3. Many-to-Many Relationships between Resume and Other Tables
const junctionTables = [
  { model: db.education, name: "resume_education" },
  { model: db.contactInfo, name: "resume_contactInfo" },
  { model: db.experience, name: "resume_experience" },
  { model: db.links, name: "resume_links" },
  { model: db.awards, name: "resume_awards" },
  { model: db.projects, name: "resume_projects" },
  { model: db.interest, name: "resume_interests" },
  { model: db.skill, name: "resume_skills" },
];

junctionTables.forEach(({ model, name }) => {
  const junctionTable = sequelize.define(name, {}, { timestamps: false });
  const aliasName = model.name.replace('resume_', ''); // Remove 'resume_' from the name
  db.resume.belongsToMany(model, { through: junctionTable, as: aliasName });
  model.belongsToMany(db.resume, { through: junctionTable, as: "resumes" });
});


// 4. User and Session (One-to-Many)
db.user.hasMany(db.session);
db.session.belongsTo(db.user);

module.exports = db;
