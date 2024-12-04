const db = require("../models");
const Resume = db.resume;
const Op = db.Sequelize.Op;
// Create and Save a new Resume
exports.create = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).send({ message: "Title cannot be empty!" });
  }

  const {
    contactIds,
    skillIds,
    experienceIds,
    educationIds,
    linkIds,
    awardIds,
    projectIds,
    interestIds,
  } = req.body;

  // Create a Resume object
  const resume = {
    title: req.body.title,
    description: req.body.description,
    userId: req.body.userId,
    pdfData: req.body.pdfBlob ? Buffer.from(req.body.pdfBlob, 'base64') : null,
  };

  try {
    // Create the Resume
    const createdResume = await Resume.create(resume);
    // BE VERY CAREFUL NOT TO CHANGE THE NAMES OF THE ADDFUNCTIONS BELOW

    if(Array.isArray(educationIds)) await createdResume.addEducation(educationIds);
    if(Array.isArray(experienceIds)) await createdResume.addExperience(experienceIds);
    if(Array.isArray(skillIds)) await createdResume.addSkill(skillIds);
    if(Array.isArray(contactIds)) await createdResume.addContactInfo(contactIds);
    if(Array.isArray(linkIds)) await createdResume.addLinks(linkIds);
    if(Array.isArray(awardIds)) await createdResume.addAwards(awardIds);
    if(Array.isArray(projectIds)) await createdResume.addProject(projectIds);
    if(Array.isArray(interestIds)) await createdResume.addInterest(interestIds);
    // Return the Resume with the newly added associations
    res.send(createdResume);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Resume.",
    });
  }
};

// Retrieve all Resumes from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Resume.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving resumes.",
      });
    });
};

// Find a single Resume with an id
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Resume.findAll({ where: { userId: userId } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Resumes for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving Resumes for user with id=" + userId,
      });
    });
};
// Find a single Resume with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    // Fetch resume from database
    const resume = await Resume.findByPk(id, {
      attributes: ['id', 'title', 'description', 'pdfData', 'userId', 'createdAt', 'updatedAt'], // Specify the fields you need
    });
    // Check if resume exists
    if (resume) {
      // Convert pdfData to base64 if it's not null
      if (resume.pdfData) {
        resume.pdfData = `data:application/pdf;base64,${resume.pdfData.toString('base64')}`;
      }

      // Send the resume data to the frontend
      return res.status(200).send(resume);
    } else {
      return res.status(404).send({
        message: `Cannot find Resume with id=${id}.`,
      });
    }
  } catch (err) {
    // Handle errors during the database query
    console.error("Error fetching resume:", err);
    return res.status(500).send({
      message: err.message || `Error retrieving Resume with id=${id}.`,
    });
  }
};

// Update a Resume by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Resume.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Resume was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Resume with id=${id}. Maybe Resume was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Resume with id=" + id,
      });
    });
};

//Get comments by id
exports.findComment = async (req, res) => {
  const id = req.params.id; // Get the resume ID from the URL

  try {
    // Fetch only the comments field for the given resume ID
    const resume = await Resume.findByPk(id, {
      attributes: ['id', 'comment'], // Fetch only ID and comments
    });

    // Check if the resume exists
    if (resume) {
      return res.status(200).send({ comment: resume.comment || '' }); // Send comments or an empty string if null
    } else {
      return res.status(404).send({
        message: `Cannot find Resume with id=${id}.`,
      });
    }
  } catch (err) {
    // Handle errors during database query
    console.error("Error fetching comments:", err);
    return res.status(500).send({
      message: err.message || `Error retrieving comments for Resume with id=${id}.`,
    });
  }
};

// Update only the comment of a Resume by the id in the request
exports.updateComment = (req, res) => {
  const id = req.params.id;
  const { comment } = req.body;

  // Check if comment is provided
  if (!comment) {
    return res.status(400).send({
      message: "Comment cannot be empty!",
    });
  }

  Resume.update(
    { comment }, // Only update the comment field
    { where: { id: id } }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Comment was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update comment for Resume with id=${id}. Maybe Resume was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating comment for Resume with id=" + id,
      });
    });
};



// Delete a Resume with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Resume.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Resume was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Resume with id=${id}. Maybe Resume was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Resume with id=" + id,
      });
    });
};
// Delete all Resumes from the database.
exports.deleteAll = (req, res) => {
  Resume.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Resumes were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all resumes.",
      });
    });
};
