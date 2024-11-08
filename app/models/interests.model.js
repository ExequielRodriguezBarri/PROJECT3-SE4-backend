module.exports = (sequelize, Sequelize) => {
    const Interest = sequelize.define("interest", {
      careerPosition: {
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