const pool = require("../utils/db");

class ClientService {
  async getClientById(clientId) {
    const query = "SELECT * FROM public.client WHERE id = $1";
    const values = [clientId];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async createClient(clientData) {
    const { id, is_first_login, is_public } = clientData;

    const query =
      "INSERT INTO public.client (id, is_first_login, is_public) VALUES ($1, $2, $3) RETURNING *";
    const values = [id, is_first_login, is_public];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async updateClient(clientId, clientData) {
    const { is_first_login, is_public } = clientData;
    const query =
      "UPDATE public.client SET is_first_login = $2, is_public = $3 WHERE id = $1 RETURNING *";
    const values = [clientId, is_first_login, is_public];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async deleteClient(clientId) {
    const query = "DELETE FROM public.client WHERE id = $1 RETURNING *";
    const values = [clientId];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

module.exports = new ClientService();
