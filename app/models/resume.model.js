module.exports = (sequelize, Sequelize) => {
    const Resume = sequelize.define("resume", {
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      comment: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
    return Resume;
};