// models/FoodRecommendationModel.js
module.exports = (sequelize, Sequelize) => {
  const FoodRecommendation = sequelize.define('FoodRecommendation', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    porsi: {
      type: Sequelize.STRING,
      allowNull: false
    },
    weight: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    calories: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    protein: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    fat: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    time: {
      type: Sequelize.STRING,
      allowNull: true
    },
    result_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
  });

  return FoodRecommendation;
};
