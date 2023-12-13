const TagService = require("../services/tag.services.js");
const Tag = require("../models/tag.model.js");

// Get Tag by ID
exports.getTagById = (req, res) => {
  const tagId = req.params.tagId;

  TagService.getTagById(tagId)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Tag with id ${tagId} not found.`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while retrieving a Tag.",
      });
    });
};
