module.exports = (sequelize, Sequelize) => {
    const Resume = sequelize.define("resume", {
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      pdfData: {
        type: Sequelize.BLOB('long'),  // Specifies a LONGBLOB in MySQL
      },

    });
    return Resume;
};