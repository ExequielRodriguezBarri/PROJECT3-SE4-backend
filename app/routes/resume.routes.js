module.exports = (app) => {
    const resumes = require("../controllers/resume.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Resume
    router.post("/", [authenticate], resumes.create);
  
    // Retrieve all resumes
    router.get("/", [authenticate], resumes.findAll);
  
    // Retrieve all resumes for user
    router.get("/user/:userId", [authenticate], resumes.findAllForUser);
  
    // Retrieve a single resume with id
    router.get("/:id", [authenticate], resumes.findOne);

    // Update a resume with id
    router.put("/:id", [authenticate], resumes.update);

    // Retrieve comments for a specific resume by ID
    router.get("/:id/comment", [authenticate], resumes.findComment);

    // Update/Add comment to resume
    router.put("/:id/comment", [authenticate], resumes.updateComment);
    
    // Delete a resume with id
    router.delete("/:id", [authenticate], resumes.delete);
  
    // Delete all resumes
    router.delete("/", [authenticate], resumes.deleteAll);
  
    app.use("/resume-t7/resumes", router);
  };