module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("project", {
      project_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
     role: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      results: {
        type: Sequelize.TEXT,
      }
    });
    return Project;
};