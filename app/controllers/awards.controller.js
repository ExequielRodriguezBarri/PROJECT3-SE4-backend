const db = require("../models");
const Awards = db.Awards;

exports.create = (req, res) => {
  if (!req.body.title || !req.body.year_Awarded) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  const award = { title: req.body.title, year_Awarded: req.body.year_Awarded, description: req.body.description };

  Awards.create(award)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error creating Award." }));
};

exports.findAll = (req, res) => {
  Awards.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving Awards." }));
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Awards.findByPk(id)
      .then(data => data ? res.send(data) : res.status(404).send({ message: `Award with id=${id} not found.` }))
      .catch(err => res.status(500).send({ message: err.message || "Error retrieving Award with id=" + id }));
  };
  
  exports.update = (req, res) => {
    const id = req.params.id;
    Awards.update(req.body, { where: { id: id } })
      .then(num => num == 1 ? res.send({ message: "Award updated successfully." }) :
        res.send({ message: `Cannot update Award with id=${id}.` }))
      .catch(err => res.status(500).send({ message: err.message || "Error updating Award with id=" + id }));
  };
  
  exports.delete = (req, res) => {
    const id = req.params.id;
    Awards.destroy({ where: { id: id } })
      .then(num => num == 1 ? res.send({ message: "Award deleted successfully!" }) :
        res.send({ message: `Cannot delete Award with id=${id}.` }))
      .catch(err => res.status(500).send({ message: err.message || "Error deleting Award with id=" + id }));
  };
  
  exports.deleteAll = (req, res) => {
    Awards.destroy({ where: {}, truncate: false })
      .then(nums => res.send({ message: `${nums} Awards were deleted successfully!` }))
      .catch(err => res.status(500).send({ message: err.message || "Error deleting all Awards." }));
  };
  