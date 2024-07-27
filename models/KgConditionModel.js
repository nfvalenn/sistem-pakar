module.exports = (sequelize, Sequelize) => {
    const KgCondition = sequelize.define('KgConditions', {
        condition_code: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        category: {
            type: Sequelize.STRING,
            allowNull: false,
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
    return KgCondition;
};