module.exports = (sequelize, Sequelize) => {
    const CourseWork = sequelize.define("CourseWork", {
      course_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      course_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    }, 
    {
      timestamps: false,
    });
  
    return CourseWork;
  };
  