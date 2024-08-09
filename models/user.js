module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        username: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        role: {
          type: Sequelize.STRING,
          defaultValue: 'user'
        }
      });      
    return User;
};
