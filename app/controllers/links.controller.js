const db = require("../models");
const Links = db.Links;

exports.create = (req, res) => {
  if (!req.body.type || !req.body.link) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  const link = { type: req.body.type, link: req.body.link };

  Links.create(link)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error creating Link." }));
};

exports.findAll = (req, res) => {
  Links.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving Links." }));
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Links.findByPk(id)
    .then(data => data ? res.send(data) : res.status(404).send({ message: `Link with id=${id} not found.` }))
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving Link with id=" + id }));
};

exports.update = (req, res) => {
  const id = req.params.id;
  Links.update(req.body, { where: { id: id } })
    .then(num => num == 1 ? res.send({ message: "Link updated successfully." }) :
      res.send({ message: `Cannot update Link with id=${id}.` }))
    .catch(err => res.status(500).send({ message: err.message || "Error updating Link with id=" + id }));
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Links.destroy({ where: { id: id } })
    .then(num => num == 1 ? res.send({ message: "Link deleted successfully!" }) :
      res.send({ message: `Cannot delete Link with id=${id}.` }))
    .catch(err => res.status(500).send({ message: err.message || "Error deleting Link with id=" + id }));
};

exports.deleteAll = (req, res) => {
  Links.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} Links were deleted successfully!` }))
    .catch(err => res.status(500).send({ message: err.message || "Error deleting all Links." }));
};
