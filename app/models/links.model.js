module.exports = (sequelize, Sequelize) => {
    const Links = sequelize.define("Links", {
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      link: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }, 
    {
      timestamps: false,
    });
  
    return Links;
  };
  