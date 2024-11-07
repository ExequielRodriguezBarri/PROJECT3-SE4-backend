module.exports = (sequelize, Sequelize) => {
  const contactInfo = sequelize.define("contactInfo", {
    first_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
      },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    },
    {
        timestamps: false
        }
        );
        return contactInfo;
}
    