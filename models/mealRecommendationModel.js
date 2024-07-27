module.exports = (sequelize, Sequelize)  => {
    const MealRecommendation = sequelize.define('MealRecommendation', {
        waktu: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        nama_masakan: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        nama_bahan: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        berat: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        energi: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        protein: {
          type: Sequelize.DECIMAL(5, 2),
          allowNull: false,
        },
        lemak: {
          type: Sequelize.DECIMAL(5, 2),
          allowNull: false,
        },
        kategori_kalori: {
          type: Sequelize.STRING,
          allowNull: false,
        },
    });
    MealRecommendation;
};

