const pool = require("../utils/db");

class PostService {

    async getFeed(user_id){

        const query = "SELECT * FROM POST p " +
        "JOIN RECIPE r ON p.recipe_id = r.id " +
        "WHERE user_id IN " +
            `(SELECT followed_user_id FROM follower WHERE follower_user_id = '${user_id}')` +
            "ORDER BY upload_date_in_utc DESC"
        const result = await pool.query(query);
        return result.rows;

    }

}
  
module.exports = new PostService();

// const { user_id, recipe_id } = postData;
//         const query =
//             "INSERT INTO public.post (user_id, upload_date_in_utc, recipe_id) VALUES ($1, $2, $3) RETURNING *";

//         const now = new Date()
//         const values = [
//             user_id, 
//             `${now.getUTCFullYear()}-${now.getUTCMonth()}-${now.getUTCDate()} ${now.getUTCHours()}:${now.getUTCMinutes()}:${now.getUTCSeconds()}`,
//             recipe_id]
//         ;
//         const result = await pool.query(query, values);
//         return result.rows[0];