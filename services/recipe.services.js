const pool = require("../utils/db");

class RecipeService {
  async getRecipeById(recipeId) {
    const query = "SELECT * FROM public.recipe WHERE id = $1";
    const values = [recipeId];
    const result = await pool.query(query, values);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async createRecipe(recipeData) {
    const {
      id,
      name,
      description,
      n_steps,
      minutes,
      steps,
      calories,
      fat,
      sugar,
      sodium,
      protein,
      sat_fat,
      carbs,
    } = recipeData;
    const query =
      "INSERT INTO public.recipe (id, name, description, n_steps, minutes, steps, calories, fat, sugar, sodium, protein, sat_fat, carbs) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *";
    const values = [
      id,
      name,
      description,
      n_steps,
      minutes,
      steps,
      calories,
      fat,
      sugar,
      sodium,
      protein,
      sat_fat,
      carbs,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async updateRecipe(recipeId, recipeData) {
    const {
      name,
      description,
      n_steps,
      minutes,
      steps,
      calories,
      fat,
      sugar,
      sodium,
      protein,
      sat_fat,
      carbs,
    } = recipeData;
    const query =
      "UPDATE public.recipe SET name = $2, description = $3, n_steps = $4, minutes = $5, steps = $6, calories = $7, fat = $8, sugar = $9, sodium = $10, protein = $11, sat_fat = $12, carbs = $13 WHERE id = $1 RETURNING *";
    const values = [
      recipeId,
      name,
      description,
      n_steps,
      minutes,
      steps,
      calories,
      fat,
      sugar,
      sodium,
      protein,
      sat_fat,
      carbs,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async deleteRecipe(recipeId) {
    const query = "DELETE FROM public.recipe WHERE id = $1 RETURNING *";
    const values = [recipeId];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

module.exports = new RecipeService();
