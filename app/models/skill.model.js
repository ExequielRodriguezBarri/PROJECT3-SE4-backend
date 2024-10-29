module.exports = (sequelize, Sequelize) => {
    const Skill = sequelize.define("skill", {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
    return Skill;
};