const RecipetagController = require("../controllers/recipetag.controller.js");
const authenticateToken = require("./middleware.js");

module.exports = (app) => {
  const router = require("express").Router();
  router.use(authenticateToken);
  app.use("/api/recipetag", router);

  // Get Tags for Recipe
  router.get("/:recipeId", RecipetagController.getTagsForRecipe);

  // Add Tag to Recipe
  router.post("/:recipeId/:tagId", RecipetagController.addTagToRecipe);

  // Remove Tag from Recipe
  router.delete("/:recipeId/:tagId", RecipetagController.removeTagFromRecipe);
};
