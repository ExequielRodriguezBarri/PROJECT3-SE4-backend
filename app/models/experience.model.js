module.exports = (sequelize, Sequelize) => {
    const Experience = sequelize.define("Experience", {
      position_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      company: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      job_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      years_worked: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    }, 
    {
      timestamps: false,
    });
  
    return Experience;
  };
  