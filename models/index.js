const { Sequelize } = require('sequelize');
const config = require('../config/config.js');

const env = process.env.NODE_ENV || 'development';
const sequelizeConfig = config[env];

const sequelize = new Sequelize(sequelizeConfig.database, sequelizeConfig.username, sequelizeConfig.password, {
  host: sequelizeConfig.host,
  dialect: sequelizeConfig.dialect,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Implikasi model
db.user = require('./user')(sequelize, Sequelize);
db.article = require('./articleModel.js')(sequelize, Sequelize);
db.consultation = require('./consultationModel.js')(sequelize, Sequelize);
db.rules = require('./ruleModel.js')(sequelize, Sequelize);
db.consultationrules = require('./consultationRulesModel.js')(sequelize, Sequelize);
db.icondition = require('./IConditionModel.js')(sequelize, Sequelize);
db.afcondition = require('./AfConditionModel.js')(sequelize, Sequelize);
db.hcondition = require('./HConditionModel.js')(sequelize, Sequelize);
db.kgcondition = require('./KgConditionModel.js')(sequelize, Sequelize);
db.tscondition = require('./TsCondition.js')(sequelize, Sequelize);
db.result = require('./resultModel.js')(sequelize, Sequelize); // Tambahkan model Result

// Relasi antara model
db.user.hasMany(db.article, { foreignKey: 'authorId', as: 'articles' });
db.article.belongsTo(db.user, { foreignKey: 'authorId', as: 'author' });

db.user.hasMany(db.consultation, { foreignKey: 'userId', as: 'consultations' });
db.consultation.belongsTo(db.user, { foreignKey: 'userId', as: 'user' });

db.rules.belongsTo(db.icondition, { foreignKey: 'i_condition_id', as: 'iCondition' });
db.rules.belongsTo(db.afcondition, { foreignKey: 'af_condition_id', as: 'afCondition' });
db.rules.belongsTo(db.kgcondition, { foreignKey: 'kg_condition_id', as: 'kgCondition' });
db.rules.belongsTo(db.tscondition, { foreignKey: 'ts_condition_id', as: 'tsCondition' });
db.rules.belongsTo(db.hcondition, { foreignKey: 'h_condition_id', as: 'hCondition' });

db.icondition.hasMany(db.rules, { foreignKey: 'i_condition_id', as: 'ruless' });
db.afcondition.hasMany(db.rules, { foreignKey: 'af_condition_id', as: 'ruless' });
db.kgcondition.hasMany(db.rules, { foreignKey: 'kg_condition_id', as: 'ruless' });
db.tscondition.hasMany(db.rules, { foreignKey: 'ts_condition_id', as: 'ruless' });
db.hcondition.hasMany(db.rules, { foreignKey: 'h_condition_id', as: 'ruless' });

db.consultation.belongsToMany(db.rules, {
  through: db.consultationrules,
  as: 'rules',
  foreignKey: 'consultationId'
});
db.rules.belongsToMany(db.consultation, {
  through: db.consultationrules,
  as: 'consultations',
  foreignKey: 'ruleId'
});

db.consultation.hasMany(db.consultationrules, { foreignKey: 'consultationId' });
db.consultationrules.belongsTo(db.consultation, { foreignKey: 'consultationId' });

db.consultationrules.belongsTo(db.rules, { foreignKey: 'ruleId' });
db.rules.hasMany(db.consultationrules, { foreignKey: 'ruleId' });

db.consultation.belongsTo(db.afcondition, { foreignKey: 'activityLevelId' });
db.consultation.belongsTo(db.kgcondition, { foreignKey: 'bloodSugarId' });
db.consultation.belongsTo(db.hcondition, { foreignKey: 'hba1cId' });
db.consultation.belongsTo(db.tscondition, { foreignKey: 'stressLevelId' });

db.rules.belongsTo(db.result, { foreignKey: 'result_id', as: 'result' }); // Menambahkan relasi ke Result
db.result.hasMany(db.rules, { foreignKey: 'result_id', as: 'rules' }); // Menambahkan relasi dari Result ke Rules

db.sequelize.sync({ alter: true })
  .then(() => {
    console.log('Basis data berhasil disinkronkan');
  })
  .catch((error) => {
    console.error('Kesalahan saat menyinkronkan basis data:', error);
  });

module.exports = db;
