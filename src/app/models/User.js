const db = require("../../config/db");

module.exports = {
  async findbyEmail(email) {
    const results =  await db.query(`SELECT * FROM users WHERE email = $1`, [email]);

    return results.rows[0]
  }
}