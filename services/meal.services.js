const pool = require("../utils/db");

class MealService {
  async getMealByRecipeIdAndUserId(recipeId, userId) {
    const query =
      "SELECT recipe_id, is_bookmarked, rating, is_cooked FROM public.meal WHERE recipe_id = $1 AND user_id = $2";
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

  async updateMeal(mealData) {
    const { user_id, is_bookmarked, rating, is_cooked, recipe_id } = mealData;

    let query = `INSERT INTO public.meal (recipe_id, user_id`;
    let values = [recipe_id, user_id];

    if (is_bookmarked !== null) {
      query += ", is_bookmarked";
      values.push(is_bookmarked);
    }

    if (rating !== null) {
      query += ", rating";
      values.push(rating);
    }

    if (is_cooked !== null) {
      query += ", is_cooked";
      values.push(is_cooked);
    }

    query += ") VALUES ($1, $2";

    for (let i = 3; i <= values.length; i++) {
      query += `, $${i}`;
    }

    query += ")";

    query += " ON CONFLICT (recipe_id, user_id) DO UPDATE SET";

    if (is_bookmarked !== null) {
      query += " is_bookmarked = EXCLUDED.is_bookmarked";
    }

    if (rating !== null) {
      query += " rating = EXCLUDED.rating";
    }

    if (is_cooked !== null) {
      query += ", is_cooked = EXCLUDED.is_cooked";
    }

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
      const recipeId = row.recipe_id;
      const recipeQuery = "SELECT * FROM public.recipe WHERE id = $1";
      const recipeValues = [recipeId];
      const recipeResult = await pool.query(recipeQuery, recipeValues);
      if (recipeResult.rows.length > 0) {
        recipes.push(recipeResult.rows[0]); // Add the recipe details to the recipes array
      }
    }
    return recipes
  }
}

module.exports = new MealService();
