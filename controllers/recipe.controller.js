const RecipeService = require("../services/recipe.services.js");
const Recipe = require("../models/recipe.model.js");

// Create Recipe
exports.createRecipe = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const recipeData = new Recipe(
    req.body.id,
    req.body.name,
    req.body.description,
    req.body.n_steps,
    req.body.minutes,
    req.body.steps,
    req.body.calories,
    req.body.fat,
    req.body.sugar,
    req.body.sodium,
    req.body.protein,
    req.body.sat_fat,
    req.body.carbs
  );

  RecipeService.createRecipe(recipeData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while creating a Recipe.",
      });
    });
};

// Get Recipe by ID
exports.getRecipeById = (req, res) => {
  const recipeId = req.params.recipeId;

  RecipeService.getRecipeById(recipeId)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Recipe with id ${recipeId} not found.`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while retrieving a Recipe.",
      });
    });
};

exports.getRecommendationRecipes = (req, res) => {
  const recipeId = req.params.recipeId;

  RecipeService.getRecommendationRecipes(recipeId)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Recipe with id ${recipeId} not found.`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while retrieving a Recipe.",
      });
    });
};

// Update Recipe
exports.updateRecipe = (req, res) => {
  const recipeId = req.params.recipeId;

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const recipeData = new Recipe(
    recipeId,
    req.body.name,
    req.body.description,
    req.body.n_steps,
    req.body.minutes,
    req.body.steps,
    req.body.calories,
    req.body.fat,
    req.body.sugar,
    req.body.sodium,
    req.body.protein,
    req.body.sat_fat,
    req.body.carbs
  );

  RecipeService.updateRecipe(recipeId, recipeData)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Recipe with id ${recipeId} not found.`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while updating a Recipe.",
      });
    });
};

// Delete Recipe
exports.deleteRecipe = (req, res) => {
  const recipeId = req.params.recipeId;

  RecipeService.deleteRecipe(recipeId)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Recipe with id ${recipeId} not found.`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while deleting a Recipe.",
      });
    });
};
