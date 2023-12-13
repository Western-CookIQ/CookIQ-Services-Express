const RecipetagService = require("../services/recipetag.services.js");
const Recipetag = require("../models/recipetag.model.js");

// Get Tags for Recipe
exports.getTagsForRecipe = (req, res) => {
  const recipeId = req.params.recipeId;

  RecipetagService.getTagsForRecipe(recipeId)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "An error occurred while retrieving tags for a Recipe.",
      });
    });
};

// Add Tag to Recipe
exports.addTagToRecipe = (req, res) => {
  const recipeId = req.params.recipeId;
  const tagId = req.params.tagId;

  RecipetagService.addTagToRecipe(recipeId, tagId)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error occurred while adding a tag to a Recipe.",
      });
    });
};

// Remove Tag from Recipe
exports.removeTagFromRecipe = (req, res) => {
  const recipeId = req.params.recipeId;
  const tagId = req.params.tagId;

  RecipetagService.removeTagFromRecipe(recipeId, tagId)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "An error occurred while removing a tag from a Recipe.",
      });
    });
};
