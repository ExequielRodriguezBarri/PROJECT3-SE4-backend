module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("project", {
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
      },
    });
    return Project;
};