module.exports = (app) => {
    const skills = require("../controllers/skill.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Resume
    router.post("/", [authenticate], skills.create);
  
    // Retrieve all skills
    router.get("/", [authenticate], skills.findAll);
  
    // Retrieve all skills for user
    router.get("/:userId", [authenticate], skills.findAllForUser);
  
    // Retrieve a single skill with id
    router.get("/:id", [authenticate], skills.findOne);
  
    // Update a skill with id
    router.put("/:id", [authenticate], skills.update);
  
    // Delete a skill with id
    router.delete("/:id", [authenticate], skills.delete);
  
    // Delete all skills
    router.delete("/", [authenticate], skills.deleteAll);
  
    app.use("/resume/skill", router);
  };