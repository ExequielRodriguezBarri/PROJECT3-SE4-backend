export default (sequelize, Sequelize) => {
    const contactInfo = sequelize.define("contactInfo", {
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
    