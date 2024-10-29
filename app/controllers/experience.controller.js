const db = require("../models");
const Experience = db.Experience;

// Create and Save a new Experience
exports.create = (req, res) => {
  if (!req.body.position_name || !req.body.company) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  const experience = {
    position_name: req.body.position_name,
    company: req.body.company,
    job_description: req.body.job_description,
    years_worked: req.body.years_worked,
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
