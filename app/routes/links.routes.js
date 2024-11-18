module.exports = (app) => {
    const links = require("../controllers/links.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Link
    router.post("/", [authenticate], links.create);
  
    // Retrieve all Links
    router.get("/", [authenticate], links.findAll);

  // Retrieve all interests for user
  router.get("/:userId", [authenticate], links.findAllForUser);

    // Retrieve a single Link with id
    router.get("/:id", [authenticate], links.findOne);
  
    // Update a Link with id
    router.put("/:id", [authenticate], links.update);
  
    // Delete a Link with id
    router.delete("/:id", [authenticate], links.delete);
  
    // Delete all Links
    router.delete("/", [authenticate], links.deleteAll);
  
    app.use("/resume-t7/links", router);
  };
  