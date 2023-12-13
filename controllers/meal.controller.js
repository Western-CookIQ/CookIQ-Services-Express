const MealService = require("../services/meal.services.js");
const Meal = require("../models/meal.model.js");

// Get Meal by Recipe ID and User ID
exports.getMealByRecipeIdAndUserId = (req, res) => {
  const recipeId = req.params.recipeId;
  const userId = req.params.userId;

  MealService.getMealByRecipeIdAndUserId(recipeId, userId)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while retrieving a Meal.",
      });
    });
};

// Get All Meals by User ID
exports.getMealsByUserId = (req, res) => {
  const userId = req.params.userId;

  MealService.getMealsByUserId(userId)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while retrieving Meals.",
      });
    });
};

// Create Meal
exports.createMeal = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const mealData = new Meal(
    req.body.recipe_id,
    req.body.user_id,
    req.body.is_bookmarked,
    req.body.rating,
    req.body.is_cooked
  );

  MealService.createMeal(mealData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while creating a Meal.",
      });
    });
};

// Update Meal
exports.updateMeal = (req, res) => {
  const recipeId = req.params.recipeId;
  const userId = req.params.userId;

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const mealData = new Meal(
    recipeId,
    userId,
    req.body.is_bookmarked,
    req.body.rating,
    req.body.is_cooked
  );

  MealService.updateMeal(recipeId, userId, mealData)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Meal with recipe id ${recipeId} and user id ${userId} not found.`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while updating a Meal.",
      });
    });
};

// Delete Meal
exports.deleteMeal = (req, res) => {
  const recipeId = req.params.recipeId;
  const userId = req.params.userId;

  MealService.deleteMeal(recipeId, userId)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Meal with recipe id ${recipeId} and user id ${userId} not found.`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while deleting a Meal.",
      });
    });
};
