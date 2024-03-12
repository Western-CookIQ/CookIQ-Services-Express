const PostService = require("../services/post.services.js");

exports.createPost = (req, res) => {
    const postData = {
        user_id: req.user.sub,
        recipe_id: req.query.recipe_id,
    };

    PostService.createPost(postData)
        .then((data) => {
        res.send(data);
        })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving followers.",
        });
        });
};