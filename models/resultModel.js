module.exports = (sequelize, Sequelize) => {
    const Result = sequelize.define('results', {
      code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      calorie_range: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      }
    });
    return Result;
  };
  