const FeedService = require("../services/feed.services.js");

exports.getFeed = (req, res) => {
    const user_id = req.user.sub

    FeedService.getFeed(user_id)
        .then((data) => {
        res.send(data);
        })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving followers.",
        });
        });
};

exports.likePost = (req, res) => {

    const user_id = req.user.sub
    const post_id = Number(req.params.postId)
    const is_liked = (req.query.is_liked === 'true')

    FeedService.likePost(user_id, post_id, is_liked)
        .then((data) => {
        res.send(data);
        })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving followers.",
        });
        });
}

exports.getIsLikedPost = (req, res) => {
  const user_id = req.user.sub
  const post_id = Number(req.params.postId)

  FeedService.getIsLikedPost(user_id, post_id)
        .then((data) => {
        res.send(data);
        })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving followers.",
        });
        });
}

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