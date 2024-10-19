module.exports = (sequelize, Sequelize) => {
    const Resume = sequelize.define("resume", {
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
    });
    return Resume;
};