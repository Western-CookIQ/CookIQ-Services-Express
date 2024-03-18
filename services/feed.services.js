const pool = require("../utils/db");

class FeedService {
  async getFeed(user_id) {
    const query =
      "SELECT * FROM POST p " +
      "JOIN RECIPE r ON p.recipe_id = r.id " +
      "WHERE user_id IN " +
      `(SELECT followed_user_id FROM follower WHERE follower_user_id = '${user_id}')` +
      "ORDER BY upload_date_in_utc DESC";
    const result = await pool.query(query);
    return result.rows;
  }

  async createPost(postData) {
    const { user_id, recipe_id } = postData;
    let query =
      "INSERT INTO public.post (user_id, recipe_id) VALUES ($1, $2) RETURNING *";
    await pool.query(query, [user_id, recipe_id]);

    return { message: "Post created successfully" };
  }
}

module.exports = new FeedService();
