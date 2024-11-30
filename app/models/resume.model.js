module.exports = (sequelize, Sequelize) => {
    const Resume = sequelize.define("resume", {
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      comment: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING,
      },
      pdfData: {
        type: Sequelize.BLOB('long'),  // 'long' for large binary objects (e.g., PDFs)
        allowNull: false,  // Allow null if not every user will have a PDF
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
    return Resume;
};