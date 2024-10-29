const db = require("../models");
const Education = db.education;
const Op = db.Sequelize.Op;
// Create and Save a new Education
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a Education
  const education = {
    name: req.body.name,
    description: req.body.degreeType,
    userId: req.body.userId,
  };
  // Save Education in the database
  Education.create(education)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Education.",
      });
    });
};
// Retrieve all Educations from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  Education.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving educations.",
      });
    });
};

// Find a single Education with an id
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Education.findAll({ where: { userId: userId } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Educations for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving Educations for user with id=" + userId,
      });
    });
};
// Find a single Education with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Education.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Education with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Education with id=" + id,
      });
    });
};
// Update a Education by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Education.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Education was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Education with id=${id}. Maybe Education was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Education with id=" + id,
      });
    });
};
// Delete a Education with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Education.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Education was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Education with id=${id}. Maybe Education was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Education with id=" + id,
      });
    });
};
// Delete all Educations from the database.
exports.deleteAll = (req, res) => {
  Education.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Educations were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all educations.",
      });
    });
};
