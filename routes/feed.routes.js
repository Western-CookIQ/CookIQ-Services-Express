const FeedController = require("../controllers/feed.controller.js");
const authenticateToken = require("./middleware.js");

module.exports = (app) => {
  const router = require("express").Router();
  router.use(authenticateToken);
  app.use("/api/feed", router);

  router.get("/", FeedController.getFeed)
  router.post("/:postId", FeedController.likePost)
};
