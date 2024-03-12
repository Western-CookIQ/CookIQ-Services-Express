const pool = require("../utils/db");

class PostService {

    async createPost(postData){
        const { user_id, recipe_id } = postData;
        const query =
            "INSERT INTO public.post (user_id, upload_date_in_utc, recipe_id) VALUES ($1, $2, $3) RETURNING *";

        const now = new Date()
        const values = [
            user_id, 
            `${now.getUTCFullYear()}-${now.getUTCMonth()}-${now.getUTCDate()} ${now.getUTCHours()}:${now.getUTCMinutes()}:${now.getUTCSeconds()}`,
            recipe_id]
        ;
        const result = await pool.query(query, values);
        return result.rows[0];
    }

}
  
module.exports = new PostService();