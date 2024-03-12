const RecommendationController = require("../controllers/recommendations.controller.js");
const authenticateToken = require("./middleware.js");

module.exports = (app) => {
  const router = require("express").Router();
  router.use(authenticateToken);

  app.use("/api/recommendations", router);

  // Get Recipe by ID
  router.get(
    "/content-based/:recipeId",
    RecommendationController.getRecommendationsContentBased
  );

  // Get Recipe by ID
  router.get(
    "/collaborative-based/:recipeId",
    RecommendationController.getRecommendationsCollaborativeBased
  );
};
