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
    const is_liked = Boolean(req.query.is_liked)

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