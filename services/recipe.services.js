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

  async getRecommendationRecipes(recipeId){
    // const query = `SELECT r.*, t.description as tag_ FROM (SELECT * FROM recipe WHERE id = ${recipeId}) r ` +
    // "INNER JOIN recipetag rt ON r.id = rt.recipe_id " +
    // "INNER JOIN tag t ON rt.tag_id = t.id " +
    // "LIMIT 3"
    const query1 = `SELECT * FROM recipe WHERE id = ${recipeId}`
    const recipe = await pool.query(query1);
    
    const query2 = 
    `SELECT t.* FROM (SELECT * FROM recipetag WHERE recipe_id = ${recipeId}) rt `+
    'INNER JOIN tag t ON rt.tag_id = t.id '+
    'LIMIT 3'
    const tags = await pool.query(query2)

    if (recipe.rows.length > 0){
      return {
        ...recipe.rows[0],
        tags: tags.rows.map(r => r.description)
      }
    }else{
      return null
    }
  }
}

module.exports = new RecipeService();
