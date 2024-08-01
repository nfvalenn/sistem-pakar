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

// Import models
db.User = require('./user')(sequelize, Sequelize);
db.Article = require('./articleModel')(sequelize, Sequelize);
db.Consultation = require('./consultationModel')(sequelize, Sequelize);
db.Rule = require('./ruleModel')(sequelize, Sequelize);
db.ICondition = require('./IConditionModel')(sequelize, Sequelize);
db.AfCondition = require('./AfConditionModel')(sequelize, Sequelize);
db.HCondition = require('./HConditionModel')(sequelize, Sequelize);
db.KgCondition = require('./KgConditionModel')(sequelize, Sequelize);
db.TsCondition = require('./TsCondition')(sequelize, Sequelize);
db.Result = require('./resultModel')(sequelize, Sequelize);
db.FoodRecommendation = require('./FoodRecommendationModel')(sequelize, Sequelize);

// Define associations
db.User.hasMany(db.Article, { foreignKey: 'authorId', as: 'articles' });
db.Article.belongsTo(db.User, { foreignKey: 'authorId', as: 'author' });

db.User.hasMany(db.Consultation, { foreignKey: 'userId', as: 'consultations' });
db.Consultation.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

db.Rule.belongsTo(db.ICondition, { foreignKey: 'i_condition_id', as: 'iCondition' });
db.Rule.belongsTo(db.AfCondition, { foreignKey: 'af_condition_id', as: 'afCondition' });
db.Rule.belongsTo(db.KgCondition, { foreignKey: 'kg_condition_id', as: 'kgCondition' });
db.Rule.belongsTo(db.TsCondition, { foreignKey: 'ts_condition_id', as: 'tsCondition' });
db.Rule.belongsTo(db.HCondition, { foreignKey: 'h_condition_id', as: 'hCondition' });

db.ICondition.hasMany(db.Rule, { foreignKey: 'i_condition_id', as: 'rules' });
db.AfCondition.hasMany(db.Rule, { foreignKey: 'af_condition_id', as: 'rules' });
db.KgCondition.hasMany(db.Rule, { foreignKey: 'kg_condition_id', as: 'rules' });
db.TsCondition.hasMany(db.Rule, { foreignKey: 'ts_condition_id', as: 'rules' });
db.HCondition.hasMany(db.Rule, { foreignKey: 'h_condition_id', as: 'rules' });

db.FoodRecommendation.belongsTo(db.Result, { foreignKey: 'result_id', as: 'result' });
db.Result.hasMany(db.FoodRecommendation, { foreignKey: 'result_id', as: 'foodRecommendations' });

db.Consultation.belongsTo(db.AfCondition, { foreignKey: 'activityLevelId' });
db.Consultation.belongsTo(db.KgCondition, { foreignKey: 'bloodSugarId' });
db.Consultation.belongsTo(db.HCondition, { foreignKey: 'hba1cId' });
db.Consultation.belongsTo(db.TsCondition, { foreignKey: 'stressLevelId' });
db.Consultation.belongsTo(db.ICondition, { foreignKey: 'imtId' });

db.AfCondition.hasMany(db.Consultation, { foreignKey: 'activityLevelId' });
db.KgCondition.hasMany(db.Consultation, { foreignKey: 'bloodSugarId' });
db.HCondition.hasMany(db.Consultation, { foreignKey: 'hba1cId' });
db.TsCondition.hasMany(db.Consultation, { foreignKey: 'stressLevelId' });
db.ICondition.hasMany(db.Consultation, { foreignKey: 'imtId' });

db.Rule.belongsTo(db.Result, { foreignKey: 'result_id', as: 'result' });
db.Result.hasMany(db.Rule, { foreignKey: 'result_id', as: 'rules' });

// Sync database
db.sequelize.sync({ alter: true })
  .then(() => {
    console.log('Basis data berhasil disinkronkan');
  })
  .catch((error) => {
    console.error('Kesalahan saat menyinkronkan basis data:', error);
  });

module.exports = db;
