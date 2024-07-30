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

db.user = require('./user')(sequelize, Sequelize);
db.article = require('./articleModel.js')(sequelize, Sequelize);
db.consultation = require('./consultationModel.js')(sequelize, Sequelize);
db.rules = require('./ruleModel.js')(sequelize, Sequelize);
db.icondition = require('./IConditionModel.js')(sequelize, Sequelize);
db.afcondition = require('./AfConditionModel.js')(sequelize, Sequelize);
db.hcondition = require('./HConditionModel.js')(sequelize, Sequelize);
db.kgcondition = require('./KgConditionModel.js')(sequelize, Sequelize);
db.tscondition = require('./TsCondition.js')(sequelize, Sequelize);
db.result = require('./resultModel.js')(sequelize, Sequelize);
db.foodRecomendation = require('./FoodRecommendationModel.js')(sequelize, Sequelize);

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

db.foodRecomendation.belongsTo(db.result, { foreignKey: 'result_id', as: 'result' });
db.result.hasMany(db.foodRecomendation, { foreignKey: 'result_id', as: 'foodRecommendations' });

db.consultation.belongsTo(db.afcondition, { foreignKey: 'activityLevelId' });
db.consultation.belongsTo(db.kgcondition, { foreignKey: 'bloodSugarId' });
db.consultation.belongsTo(db.hcondition, { foreignKey: 'hba1cId' });
db.consultation.belongsTo(db.tscondition, { foreignKey: 'stressLevelId' });
db.consultation.belongsTo(db.icondition, { foreignKey: 'imtId' });

db.afcondition.hasMany(db.consultation, { foreignKey: 'activityLevelId' });
db.kgcondition.hasMany(db.consultation, { foreignKey: 'bloodSugarId' });
db.hcondition.hasMany(db.consultation, { foreignKey: 'hba1cId' });
db.tscondition.hasMany(db.consultation, { foreignKey: 'stressLevelId' });
db.icondition.hasMany(db.consultation, { foreignKey: 'imtId' });
db.user.hasMany(db.consultation, { foreignKey: 'userId' });

db.rules.belongsTo(db.result, { foreignKey: 'result_id', as: 'result' });
db.result.hasMany(db.rules, { foreignKey: 'result_id', as: 'rules' });

db.sequelize.sync({ alter: true })
  .then(() => {
    console.log('Basis data berhasil disinkronkan');
  })
  .catch((error) => {
    console.error('Kesalahan saat menyinkronkan basis data:', error);
  });

module.exports = db;
