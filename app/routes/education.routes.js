module.exports = (app) => {
    const educations = require("../controllers/education.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Resume
    router.post("/", [authenticate], educations.create);
  
    // Retrieve all educations
    router.get("/", [authenticate], educations.findAll);
  
    // Retrieve all educations for user
    router.get("/:userId", [authenticate], educations.findAllForUser);
  
    // Retrieve a single education with id
    router.get("/:id", [authenticate], educations.findOne);
  
    // Update a education with id
    router.put("/:id", [authenticate], educations.update);
  
    // Delete a education with id
    router.delete("/:id", [authenticate], educations.delete);
  
    // Delete all educations
    router.delete("/", [authenticate], educations.deleteAll);
  
    app.use("/resume-t7/education", router);
  };