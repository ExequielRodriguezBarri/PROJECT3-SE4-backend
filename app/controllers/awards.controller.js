const db = require("../models");
const Awards = db.awards;

exports.create = (req, res) => {
  if (!req.body.title || !req.body.year_Awarded) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  const award = { title: req.body.title, year_Awarded: req.body.year_Awarded, description: req.body.description, userId: req.body.userId,
  };

  Awards.create(award)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error creating Award." }));
};

exports.findAll = (req, res) => {
  Awards.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving Awards." }));
};


// Find a single ContactInfo with an id
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Awards.findAll({ where: { userId: userId } })
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
  