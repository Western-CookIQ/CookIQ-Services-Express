const FeedService = require("../services/feed.services.js");

exports.getFeed = (req, res) => {
  const user_id = req.user.sub;

  FeedService.getFeed(user_id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error occurred while getting a user's feed.",
      });
    });
};

exports.createPost = (req, res) => {
  const postData = {
    user_id: req.user.sub,
    recipe_id: req.body.recipe_id,
    rating: req.body.rating,
  };

  FeedService.createPost(postData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while posting.",
      });
    });
};
