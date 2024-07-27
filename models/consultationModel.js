module.exports = (sequelize, Sequelize) => {
    const Consultation = sequelize.define('Consultation', {
        weight: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        height: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        age: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        gender: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        activityLevelId: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        bloodSugarId: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        hba1cId: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        stressLevelId: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        imt: {
          type: Sequelize.FLOAT,
          allowNull: true,
          // Hasil perhitungan BMI
        },
      });
      return Consultation;
};
