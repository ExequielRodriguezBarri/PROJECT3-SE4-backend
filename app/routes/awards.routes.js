module.exports = (app) => {
    const awards = require("../controllers/awards.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Award
    router.post("/", [authenticate], awards.create);
  
    // Retrieve all Awards
    router.get("/", [authenticate], awards.findAll);
  
    // Retrieve a single Award with id
    router.get("/:id", [authenticate], awards.findOne);
  
    // Update an Award with id
    router.put("/:id", [authenticate], awards.update);
  
    // Delete an Award with id
    router.delete("/:id", [authenticate], awards.delete);
  
    // Delete all Awards
    router.delete("/", [authenticate], awards.deleteAll);
  
    app.use("/resume/awards", router);
  };
  