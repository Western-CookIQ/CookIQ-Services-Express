const MealController = require("../controllers/meal.controller.js");
const authenticateToken = require("./middleware.js");

module.exports = (app) => {
  const router = require("express").Router();
  router.use(authenticateToken);
  app.use("/api/meal", router);

  // Get Bookmarked Meals
  router.get("/bookmarks/:userId", MealController.getBookmarkedMeals)
  
  // Get all meals from a User
  router.get("/:userId", MealController.getMealsByUserId);
  
  // Get Meal by Recipe ID and User ID
  router.get("/:recipeId/:userId", MealController.getMealByRecipeIdAndUserId);

  // Create Meal
  router.post("/", MealController.createMeal);

  // Update Meal
  router.put("/:recipeId/:userId", MealController.updateMeal);

  // Delete Meal
  router.delete("/:recipeId/:userId", MealController.deleteMeal);

  
};
