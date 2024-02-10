const ConnectionsService = require("../services/connections.services.js");

// Get Followers by User ID
exports.getFollowersByUserId = (req, res) => {
  const userSub = req.user.sub;

  ConnectionsService.getFollowersById(userSub)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while retrieving followers.",
      });
    });
};

// Get Following by User ID
exports.getFollowingByUserId = (req, res) => {
  const currentUserSub = req.user.sub;

  // check if a query parameter is passed user exists
  if (req.query.user !== undefined) {
    const userSub = req.query.user;
    ConnectionsService.getFollowingStatusById({
      follower_user_id: currentUserSub,
      followed_user_id: userSub,
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "An error occurred while retrieving following.",
        });
      });
  } else {
    ConnectionsService.getFollowingById(currentUserSub)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "An error occurred while retrieving following.",
        });
      });
  }
};

// Follow a User
exports.followUser = (req, res) => {
  const userData = {
    follower_user_id: req.user.sub,
    followed_user_id: req.body.followed_user_id,
  };

  ConnectionsService.followUser(userData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while following a user.",
      });
    });
};

// Unfollow a User
exports.unfollowUser = (req, res) => {
  const userData = {
    follower_user_id: req.user.sub,
    followed_user_id: req.query.user,
  };

  ConnectionsService.unfollowUser(userData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while unfollowing a user.",
      });
    });
};
