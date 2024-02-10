const pool = require("../utils/db");

class ConnectionsService {
  async getFollowingById(clientId) {
    const query =
      "SELECT followed_user_id FROM public.follower WHERE follower_user_id = $1";
    const values = [clientId];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async getFollowingStatusById(clientData) {
    const { follower_user_id, followed_user_id } = clientData;

    const query =
      "SELECT * FROM public.follower WHERE follower_user_id = $1 AND followed_user_id = $2";
    const values = [follower_user_id, followed_user_id];
    const result = await pool.query(query, values);
    return result.rows[0] ? true : false;
  }

  async getFollowersById(clientId) {
    const query =
      "SELECT follower_user_id FROM public.follower WHERE followed_user_id = $1";
    const values = [clientId];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async followUser(clientData) {
    const { follower_user_id, followed_user_id } = clientData;

    const query =
      "INSERT INTO public.follower (follower_user_id, followed_user_id) VALUES ($1, $2) RETURNING *";
    const values = [follower_user_id, followed_user_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async unfollowUser(clientData) {
    const { follower_user_id, followed_user_id } = clientData;

    const query =
      "DELETE FROM public.follower WHERE follower_user_id = $1 AND followed_user_id = $2 RETURNING *";
    const values = [follower_user_id, followed_user_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

module.exports = new ConnectionsService();
