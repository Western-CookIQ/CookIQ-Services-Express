const axios = require("axios");

// Content Based Recommendations
exports.getRecommendationsContentBased = (req, res) => {
  const recipeId = req.params.recipeId;

  axios
    .get(
      `https://a85qb0exbe.execute-api.us-east-2.amazonaws.com/dev/content-based/${recipeId}`
    )
    .then(async (response) => {
      const recommendedRecipesIds = response.data;
      res.send(recommendedRecipesIds);
    })
    .catch((error) => {
      // Handle error
      res.send(error);
    });
};

// Content Based Recommendations
exports.getRecommendationsCollaborativeBased = (req, res) => {
  const recipeId = req.params.recipeId;

  axios
    .get(
      `https://a85qb0exbe.execute-api.us-east-2.amazonaws.com/dev/collaborative-based/${recipeId}`
    )
    .then(async (response) => {
      const recommendedRecipesIds = response.data;
      res.send(recommendedRecipesIds);
    })
    .catch((error) => {
      // Handle error
      res.send(error);
    });
};
