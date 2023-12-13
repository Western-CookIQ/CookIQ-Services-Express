const TagController = require("../controllers/tag.controller.js");
const authenticateToken = require("./middleware.js");

module.exports = (app) => {
  const router = require("express").Router();
  router.use(authenticateToken);

  app.use("/api/tag", router);

  // Get Tag by ID
  router.get("/:tagId", TagController.getTagById);
};
