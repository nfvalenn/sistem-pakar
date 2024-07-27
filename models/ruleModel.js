// models/ruleModel.js
module.exports = (sequelize, Sequelize) => {
  const Rule = sequelize.define('Rule', {
    i_condition_id: {
      type: Sequelize.INTEGER,
      references: { model: 'IConditions', key: 'id' },
      allowNull: false
    },
    af_condition_id: {
      type: Sequelize.INTEGER,
      references: { model: 'AFConditions', key: 'id' },
      allowNull: false
    },
    kg_condition_id: {
      type: Sequelize.INTEGER,
      references: { model: 'KGConditions', key: 'id' },
      allowNull: false
    },
    ts_condition_id: {
      type: Sequelize.INTEGER,
      references: { model: 'TSConditions', key: 'id' },
      allowNull: false
    },
    h_condition_id: {
      type: Sequelize.INTEGER,
      references: { model: 'HConditions', key: 'id' },
      allowNull: false
    },
    result_id: {
      type: Sequelize.INTEGER,
      references: { model: 'Results', key: 'id' },
      allowNull: false
    },
    cf: {
      type: Sequelize.FLOAT,
      allowNull: false
    }
  });
  return Rule;
};
