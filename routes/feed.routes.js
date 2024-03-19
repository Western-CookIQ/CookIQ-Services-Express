const FeedController = require("../controllers/feed.controller.js");
const authenticateToken = require("./middleware.js");

module.exports = (app) => {
  const router = require("express").Router();
  router.use(authenticateToken);
  app.use("/api/feed", router);

  router.get("/", FeedController.getFeed)
  // create a post to a user's feed
  router.post("/", FeedController.createPost);

  router.get('/:postId', FeedController.getIsLikedPost)

  router.post("/:postId", FeedController.likePost)
};
