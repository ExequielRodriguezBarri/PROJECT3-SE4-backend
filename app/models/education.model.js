module.exports = (sequelize, Sequelize) => {
    const Education = sequelize.define("education", {
      institution: {
        type: Sequelize.STRING,
        allowNull: false
      },
      degree: {
        type: Sequelize.STRING,
        allowNull: false
      },
      graduationDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      gpa: {
        type: Sequelize.STRING,
        allowNull: false
      },
      relevantWork: {
        type: Sequelize.STRING,
      },
    });
    return Education;
};