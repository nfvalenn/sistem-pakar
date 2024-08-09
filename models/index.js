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

// Ensure the alias names match
db.Consultation.belongsTo(db.AfCondition, { foreignKey: 'activityLevelId', as: 'activityLevel' });
db.Consultation.belongsTo(db.KgCondition, { foreignKey: 'bloodSugarId', as: 'bloodSugar' });
db.Consultation.belongsTo(db.HCondition, { foreignKey: 'hba1cId', as: 'hba1c' });
db.Consultation.belongsTo(db.TsCondition, { foreignKey: 'stressLevelId', as: 'stressLevel' });
db.Consultation.belongsTo(db.ICondition, { foreignKey: 'imtId', as: 'iCondition' });

db.AfCondition.hasMany(db.Consultation, { foreignKey: 'activityLevelId', as: 'consultations' });
db.KgCondition.hasMany(db.Consultation, { foreignKey: 'bloodSugarId', as: 'consultations' });
db.HCondition.hasMany(db.Consultation, { foreignKey: 'hba1cId', as: 'consultations' });
db.TsCondition.hasMany(db.Consultation, { foreignKey: 'stressLevelId', as: 'consultations' });
db.ICondition.hasMany(db.Consultation, { foreignKey: 'imtId', as: 'consultations' });

db.Rule.belongsTo(db.ICondition, { foreignKey: 'i_condition_id', as: 'iCondition' });
db.Rule.belongsTo(db.AfCondition, { foreignKey: 'af_condition_id', as: 'afCondition' });
db.Rule.belongsTo(db.KgCondition, { foreignKey: 'kg_condition_id', as: 'kgCondition' });
db.Rule.belongsTo(db.TsCondition, { foreignKey: 'ts_condition_id', as: 'tsCondition' });
db.Rule.belongsTo(db.HCondition, { foreignKey: 'h_condition_id', as: 'hCondition' });
db.Rule.belongsTo(db.Result, { foreignKey: 'result_id', as: 'result' });

db.Result.hasMany(db.Rule, { foreignKey: 'result_id', as: 'rules' });
db.FoodRecommendation.belongsTo(db.Result, { foreignKey: 'result_id', as: 'result' });
db.Result.hasMany(db.FoodRecommendation, { foreignKey: 'result_id', as: 'foodRecommendations' });

// Sync database
db.sequelize.sync({ alter: true })
  .then(() => {
    console.log('Basis data berhasil disinkronkan');
  })
  .catch((error) => {
    console.error('Kesalahan saat menyinkronkan basis data:', error);
  });

module.exports = db;
