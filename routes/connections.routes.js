const ConnectionsController = require("../controllers/connections.controller.js");
const authenticateToken = require("./middleware.js");

module.exports = (app) => {
  const router = require("express").Router();
  router.use(authenticateToken);
  app.use("/api/connections", router);

  // Get all Users who follow a given User
  router.get("/followers", ConnectionsController.getFollowersByUserId);

  // Get Users who a User follows
  router.get("/following", ConnectionsController.getFollowingByUserId);

  // Follow a User
  router.post("/", ConnectionsController.followUser);

  // Unfollow a User
  router.delete("/", ConnectionsController.unfollowUser);
};
