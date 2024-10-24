module.exports = (app) => {
    const interests = require("../controllers/interest.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Resume
    router.post("/", [authenticate], interests.create);
  
    // Retrieve all interests
    router.get("/", [authenticate], interests.findAll);
  
    // Retrieve all interests for user
    router.get("/:userId", [authenticate], interests.findAllForUser);
  
    // Retrieve a single interest with id
    router.get("/:id", [authenticate], interests.findOne);
  
    // Update a interest with id
    router.put("/:id", [authenticate], interests.update);
  
    // Delete a interest with id
    router.delete("/:id", [authenticate], interests.delete);
  
    // Delete all interests
    router.delete("/", [authenticate], interests.deleteAll);
  
    app.use("/resume/interest", router);
  };