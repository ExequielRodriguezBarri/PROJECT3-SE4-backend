module.exports = (sequelize, Sequelize) => {
    const Awards = sequelize.define("Awards", {
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      year_Awarded: {
        type: Sequelize.INTEGER,
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
  
    return Awards;
  };
  