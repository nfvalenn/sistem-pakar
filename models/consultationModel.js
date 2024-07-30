module.exports = (sequelize, Sequelize) => {
    const Consultations = sequelize.define('Consultations', {
        weight: {
          type: Sequelize.FLOAT
        },
        height: {
          type: Sequelize.FLOAT
        },
        age: {
          type: Sequelize.INTEGER
        },
        gender: {
          type: Sequelize.STRING
        },
        imtId: {
          type: Sequelize.INTEGER
        },
        activityLevelId: {
          type: Sequelize.INTEGER
        },
        bloodSugarId: {
          type: Sequelize.INTEGER
        },
        hba1cId: {
          type: Sequelize.INTEGER
        },
        stressLevelId: {
          type: Sequelize.INTEGER
        },
        imt: {
          type: Sequelize.FLOAT
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        userId: {
          type: Sequelize.INTEGER
        }
      });
      return Consultations
}
