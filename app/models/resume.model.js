module.exports = (sequelize, Sequelize) => {
    const Resume = sequelize.define("resume", {
      title: {
        type: Sequelize.STRING,
        allowNull: false
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