module.exports = (sequelize, Sequelize) => {
    const Experience = sequelize.define("Experience", {
      job_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      company_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
      start_date: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.STRING,
      },
      responsibilities: {
        type: Sequelize.TEXT,
        allowNull: true,
      }
    }, 
    {
      timestamps: false,
    });
  
    return Experience;
  };
  