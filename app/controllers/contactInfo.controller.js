const db = require("../models");
const ContactInfo = db.contactInfo;
const Op = db.Sequelize.Op;
// Create and Save a new ContactInfo
exports.create = (req, res) => {
  // Create a ContactInfo
  const contactInfo = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone_number: req.body.phone_number,
    address: req.body.address,
    email: req.body.email,
    userId: req.body.userId,
  };
  // Save ContactInfo in the database
  ContactInfo.create(contactInfo)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ContactInfo.",
      });
    });
};
// Retrieve all ContactInfos from the database.
exports.findAll = (req, res) => {
  ContactInfo.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving contactInfos.",
      });
    });
};

// Find a single ContactInfo with an id
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  ContactInfo.findAll({ where: { userId: userId } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find ContactInfos for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving ContactInfos for user with id=" + userId,
      });
    });
};
// Find a single ContactInfo with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  ContactInfo.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find ContactInfo with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving ContactInfo with id=" + id,
      });
    });
};
// Update a ContactInfo by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  ContactInfo.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ContactInfo was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update ContactInfo with id=${id}. Maybe ContactInfo was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating ContactInfo with id=" + id,
      });
    });
};
// Delete a ContactInfo with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  ContactInfo.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ContactInfo was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete ContactInfo with id=${id}. Maybe ContactInfo was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete ContactInfo with id=" + id,
      });
    });
};
// Delete all ContactInfos from the database.
exports.deleteAll = (req, res) => {
  ContactInfo.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} ContactInfos were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all contactInfos.",
      });
    });
};
