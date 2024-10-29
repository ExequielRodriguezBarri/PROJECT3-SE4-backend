module.exports = (sequelize, Sequelize) => {
    const Education = sequelize.define("education", {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      degreeType: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
    return Education;
};