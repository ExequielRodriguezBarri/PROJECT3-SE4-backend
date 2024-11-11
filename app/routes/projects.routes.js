module.exports = (app) => {
    const projects = require("../controllers/projects.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Resume
    router.post("/", [authenticate], projects.create);
  
    // Retrieve all projects
    router.get("/", [authenticate], projects.findAll);
  
    // Retrieve all projects for user
    router.get("/:userId", [authenticate], projects.findAllForUser);
  
    // Retrieve a single project with id
    router.get("/:id", [authenticate], projects.findOne);
  
    // Update a project with id
    router.put("/:id", [authenticate], projects.update);
  
    // Delete a project with id
    router.delete("/:id", [authenticate], projects.delete);
  
    // Delete all projects
    router.delete("/", [authenticate], projects.deleteAll);
  
    app.use("/resume/projects", router);
  };