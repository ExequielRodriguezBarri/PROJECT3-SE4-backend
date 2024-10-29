const db = require("../models");
const CourseWork = db.CourseWork;

exports.create = (req, res) => {
  if (!req.body.course_number || !req.body.course_name) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  const course = { 
    course_number: req.body.course_number, 
    course_name: req.body.course_name, 
    description: req.body.description 
  };

  CourseWork.create(course)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error creating CourseWork." }));
};


exports.findAll = (req, res) => {
  CourseWork.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving CourseWork." }));
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    CourseWork.findByPk(id)
      .then(data => data ? res.send(data) : res.status(404).send({ message: `CourseWork with id=${id} not found.` }))
      .catch(err => res.status(500).send({ message: err.message || "Error retrieving CourseWork with id=" + id }));
  };
  
  exports.update = (req, res) => {
    const id = req.params.id;
    CourseWork.update(req.body, { where: { id: id } })
      .then(num => num == 1 ? res.send({ message: "CourseWork updated successfully." }) :
        res.send({ message: `Cannot update CourseWork with id=${id}.` }))
      .catch(err => res.status(500).send({ message: err.message || "Error updating CourseWork with id=" + id }));
  };
  
  exports.delete = (req, res) => {
    const id = req.params.id;
    CourseWork.destroy({ where: { id: id } })
      .then(num => num == 1 ? res.send({ message: "CourseWork deleted successfully!" }) :
        res.send({ message: `Cannot delete CourseWork with id=${id}.` }))
      .catch(err => res.status(500).send({ message: err.message || "Error deleting CourseWork with id=" + id }));
  };
  
  exports.deleteAll = (req, res) => {
    CourseWork.destroy({ where: {}, truncate: false })
      .then(nums => res.send({ message: `${nums} CourseWork were deleted successfully!` }))
      .catch(err => res.status(500).send({ message: err.message || "Error deleting all CourseWork." }));
  };
  