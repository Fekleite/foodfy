const { hash } = require("bcryptjs");

const db = require("../../config/db");

module.exports = {
  async findbyEmail(email) {
    const results =  await db.query(`SELECT * FROM users WHERE email = $1`, [email]);

    return results.rows[0]
  },

  async create(data) {
    try {
      const query = `
        INSERT INTO users (
          name,
          email,
          password,
          reset_token,
          reset_token_expires,
          is_admin
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
      `;
      
      const mockPass = "123456"
      const hashPassword = await hash(mockPass, 8);

      const is_admin = data.isAdmin === "on" ? true : false;

      // mocks
      const resetToken = "mock_token";
      const reserTokenExpires = "2";

      console.log(hashPassword);

      const values = [
        data.name,
        data.email,
        hashPassword,
        resetToken,
        reserTokenExpires,
        is_admin
      ];

      const results = await db.query(query, values);

      return results.rows[0].id;
    } catch (error) {
      console.log(error);
    }
  }
}