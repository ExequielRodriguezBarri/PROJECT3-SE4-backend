module.exports = (sequelize, Sequelize) => {
    const Interest = sequelize.define("interest", {
      carrerPosition: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
    return Interest;
};