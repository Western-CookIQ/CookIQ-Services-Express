const pool = require("../utils/db");

class MealService {
  async getMealByRecipeIdAndUserId(recipeId, userId) {
    const query =
      "SELECT * FROM public.meal WHERE recipe_id = $1 AND user_id = $2";
    const values = [recipeId, userId];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async getMealsByUserId(userId) {
    const query =
      "SELECT recipe_id, rating FROM public.meal WHERE user_id = $1";
    const values = [userId];
    const result = await pool.query(query, values);
    return result.rows;
  }

  async createMeal(mealData) {
    const { recipe_id, user_id, is_bookmarked, rating, is_cooked } = mealData;
    const query =
      "INSERT INTO public.meal (recipe_id, user_id, is_bookmarked, rating, is_cooked) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [recipe_id, user_id, is_bookmarked, rating, is_cooked];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async updateMeal(recipeId, userId, mealData) {
    const { is_bookmarked, rating, is_cooked } = mealData;
    const query =
      "UPDATE public.meal SET is_bookmarked = $3, rating = $4, is_cooked = $5 WHERE recipe_id = $1 AND user_id = $2 RETURNING *";
    const values = [recipeId, userId, is_bookmarked, rating, is_cooked];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async deleteMeal(recipeId, userId) {
    const query =
      "DELETE FROM public.meal WHERE recipe_id = $1 AND user_id = $2 RETURNING *";
    const values = [recipeId, userId];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async getBookmarkedMeals(userId) {
    const bookmarkQuery =
      "SELECT recipe_id FROM public.meal WHERE user_id = $1 AND is_bookmarked = true";
    const userIds = [userId];
    const bookmarkedRecipes = await pool.query(bookmarkQuery, userIds);
    
    const recipes = [];
    for (const row of bookmarkedRecipes.rows) {
      const recipeQuery = "SELECT * FROM public.recipe WHERE id = $1";
      const recipeValues = [row.recipe_id];
      const recipeResult = await pool.query(recipeQuery, recipeValues);
      if (recipeResult.rows.length > 0) {
        recipes.push(recipeResult.rows[0]);
      }
    }
    return recipes;
  }
}

module.exports = new MealService();
