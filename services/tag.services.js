const pool = require("../utils/db");

class TagService {
  async getTagById(tagId) {
    const query = "SELECT * FROM public.tag WHERE id = $1";
    const values = [tagId];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async createTag(tagData) {
    const { id, description } = tagData;
    const query =
      "INSERT INTO public.tag (id, description) VALUES ($1, $2) RETURNING *";
    const values = [id, description];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async updateTag(tagId, tagData) {
    const { description } = tagData;
    const query =
      "UPDATE public.tag SET description = $2 WHERE id = $1 RETURNING *";
    const values = [tagId, description];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async deleteTag(tagId) {
    const query = "DELETE FROM public.tag WHERE id = $1 RETURNING *";
    const values = [tagId];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

module.exports = new TagService();
