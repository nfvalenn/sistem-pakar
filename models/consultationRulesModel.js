module.exports  = (sequelize, Sequelize) => {
  const ConsultationRule = sequelize.define('ConsultationRule', {
    consultationId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Consultations',
        key: 'id',
      },
    },
    ruleId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Rules',
        key: 'id',
      },
    },
    cf: {
      type: Sequelize.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 1,
      },
    },
  });
  return ConsultationRule;
};
