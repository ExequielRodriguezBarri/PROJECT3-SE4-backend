module.exports = (app) => {
    const courseWork = require("../controllers/courseWork.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new CourseWork
    router.post("/", [authenticate], courseWork.create);
  
    // Retrieve all CourseWork
    router.get("/", [authenticate], courseWork.findAll);
  
    // Retrieve a single CourseWork with id
    router.get("/:id", [authenticate], courseWork.findOne);
  
    // Update a CourseWork with id
    router.put("/:id", [authenticate], courseWork.update);
  
    // Delete a CourseWork with id
    router.delete("/:id", [authenticate], courseWork.delete);
  
    // Delete all CourseWork
    router.delete("/", [authenticate], courseWork.deleteAll);
  
    app.use("/resume/courseWork", router);
  };
  