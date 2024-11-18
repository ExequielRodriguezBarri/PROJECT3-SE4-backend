module.exports = (app) => {
    const contactInfos = require("../controllers/contactInfo.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Resume
    router.post("/", [authenticate], contactInfos.create);
  
    // Retrieve all contactInfos
    router.get("/", [authenticate], contactInfos.findAll);
  
    // Retrieve all contactInfos for user
    router.get("/:userId", [authenticate], contactInfos.findAllForUser);
  
    // Retrieve a single contactInfo with id
    router.get("/:id", [authenticate], contactInfos.findOne);
  
    // Update a contactInfo with id
    router.put("/:id", [authenticate], contactInfos.update);
  
    // Delete a contactInfo with id
    router.delete("/:id", [authenticate], contactInfos.delete);
  
    // Delete all contactInfos
    router.delete("/", [authenticate], contactInfos.deleteAll);
  
    app.use("/resume-t7/contactInfo", router);
  };