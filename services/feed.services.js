const pool = require("../utils/db");

class FeedService {

    async getFeed(user_id){

        const query = "SELECT * FROM RECIPE r "+
        "JOIN ( " +
            "SELECT p.*, COALESCE(lp.total_likes,0) FROM Post p " +
            "LEFT JOIN ( " +
                    "SELECT post_id, COUNT(*) as total_likes FROM liked_posts " +
                    "WHERE is_liked = true " +
                    "GROUP BY (post_id) " +
                ") lp ON (p.id = lp.post_id)) " +
            "p ON p.recipe_id = r.id " +
        "WHERE user_id IN (SELECT followed_user_id FROM follower WHERE follower_user_id = " + 
        `'${user_id}') `+
        "ORDER BY upload_date_in_utc DESC "
        const result = await pool.query(query);
        return result.rows;

    }

    async likePost(user_id, post_id, is_liked){
        const query = "INSERT INTO liked_posts (user_id, post_id, is_liked) " +
        `VALUES ('${user_id}', ${post_id}, ${is_liked})` + 
        "ON CONFLICT (user_id, post_id) " +
        `DO UPDATE SET is_liked = ${is_liked}`
        const result = await pool.query(query)
        return result.rows[0];
    }

}
  
module.exports = new FeedService();

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