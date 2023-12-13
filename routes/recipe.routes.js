const RecipeController = require("../controllers/recipe.controller.js");
const authenticateToken = require("./middleware.js");

module.exports = (app) => {
  const router = require("express").Router();
  router.use(authenticateToken);
  
  app.use("/api/recipe", router);

  // Create Recipe
  router.post("/", RecipeController.createRecipe);

  // Get Recipe by ID
  router.get("/:recipeId", RecipeController.getRecipeById);

  // Update Recipe
  router.put("/:recipeId", RecipeController.updateRecipe);

  // Delete Recipe
  router.delete("/:recipeId", RecipeController.deleteRecipe);
};
