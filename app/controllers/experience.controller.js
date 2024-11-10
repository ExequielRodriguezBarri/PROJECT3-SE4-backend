const db = require("../models");
const Experience = db.experience;

// Create and Save a new Experience
exports.create = (req, res) => {

  const experience = {
    job_title: req.body.job_title,
    company_name: req.body.company_name,
    location: req.body.location,
    responsibilities: req.body.responsibilities,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    userId: req.body.userId,

  };

  Experience.create(experience)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ 
      message: err.message || "Some error occurred while creating the Experience." 
    }));
};

// Retrieve all Experiences
exports.findAll = (req, res) => {
  Experience.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({
      message: err.message || "Some error occurred while retrieving Experiences."
    }));
};

// Find a single ContactInfo with an id
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Experience.findAll({ where: { userId: userId } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Experience for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving Experience for user with id=" + userId,
      });
    });
};


// Retrieve a single Experience by ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  Experience.findByPk(id)
    .then(data => data ? res.send(data) : res.status(404).send({ message: `Experience with id=${id} not found.` }))
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving Experience with id=" + id }));
};

// Update an Experience by ID
exports.update = (req, res) => {
  const id = req.params.id;
  Experience.update(req.body, { where: { id: id } })
    .then(num => num == 1 ? res.send({ message: "Experience updated successfully." }) :
      res.send({ message: `Cannot update Experience with id=${id}.` }))
    .catch(err => res.status(500).send({ message: err.message || "Error updating Experience with id=" + id }));
};

// Delete an Experience by ID
exports.delete = (req, res) => {
  const id = req.params.id;
  Experience.destroy({ where: { id: id } })
    .then(num => num == 1 ? res.send({ message: "Experience deleted successfully!" }) :
      res.send({ message: `Cannot delete Experience with id=${id}.` }))
    .catch(err => res.status(500).send({ message: err.message || "Error deleting Experience with id=" + id }));
};

// Delete all Experiences
exports.deleteAll = (req, res) => {
  Experience.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} Experiences were deleted successfully!` }))
    .catch(err => res.status(500).send({ message: err.message || "Error deleting all Experiences." }));
};
