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