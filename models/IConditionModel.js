module.exports = (sequelize, Sequelize) => {
  const ICondition = sequelize.define('IConditions', {
    condition_code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    cf: {
      type: Sequelize.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
        max: 1
      }
    }
  });
  return ICondition;
};
