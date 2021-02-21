const { hash } = require("bcryptjs");

const db = require("../../config/db");

module.exports = {
  async all() {
    const results = await db.query(`SELECT * FROM users ORDER BY created_at DESC`);
    
    return results.rows; 
  },

  async find(id) {
    const results = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);

    return results.rows[0];
  },

  async findbyEmail(email) {
    const results =  await db.query(`SELECT * FROM users WHERE email = $1`, [email]);

    return results.rows[0];
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
  },

  update(data) {
    try {
      const query = `
        UPDATE users SET
          name=($1),
          email=($2),
          is_admin=($3)
        WHERE id=$4
      `;

      const is_admin = data.isAdmin === "on" ? true : false;

      const values = [
        data.name,
        data.email,
        is_admin,
        data.id
      ];

      return db.query(query, values);
    } catch (error) {
      console.log(error)
    }
  },

  delete(id) {
    try {
      return db.query(`DELETE FROM users WHERE id = $1`, [id]);
    } catch (error) {
      console.log(error)
    }
  },
}