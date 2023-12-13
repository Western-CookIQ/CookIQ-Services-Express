const pool = require("../utils/db");

class RecipetagService {
  async getTagsForRecipe(recipeId) {
    const query = "SELECT tag_id FROM public.recipetag WHERE recipe_id = $1";
    const values = [recipeId];
    const result = await pool.query(query, values);
    return result.rows.map((row) => row.tag_id);
  }

  async addTagToRecipe(recipeId, tagId) {
    const query =
      "INSERT INTO public.recipetag (recipe_id, tag_id) VALUES ($1, $2) RETURNING *";
    const values = [recipeId, tagId];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async removeTagFromRecipe(recipeId, tagId) {
    const query =
      "DELETE FROM public.recipetag WHERE recipe_id = $1 AND tag_id = $2 RETURNING *";
    const values = [recipeId, tagId];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

module.exports = new RecipetagService();
