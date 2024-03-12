const PostController = require("../controllers/post.controller.js");
const authenticateToken = require("./middleware.js");

module.exports = (app) => {
  const router = require("express").Router();
  router.use(authenticateToken);
  app.use("/api/post", router);

  router.post("/", PostController.createPost)
};
