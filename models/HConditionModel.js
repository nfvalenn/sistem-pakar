module.exports = (sequelize, Sequelize) => {
    const HCondition = sequelize.define('HConditions', {
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
        cf: { // Menambahkan nilai CF
            type: Sequelize.FLOAT,
            allowNull: true, // CF dapat null jika belum diatur
            validate: {
                min: 0,
                max: 1
            }
        }
    });
    return HCondition;
};