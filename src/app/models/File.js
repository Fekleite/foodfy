const fs = require("fs");

const db = require("../../config/db");

module.exports = {
  create({ filename, path, recipe_id }) {
    const query = `
      INSERT INTO files (
        name,
        path,
        recipe_id
      ) VALUES ($1, $2, $3)
      RETURNING id
    `;

    const values = [filename, path, recipe_id];

    return db.query(query, values);
  },

  find(id) {
    return db.query(`SELECT * FROM files WHERE recipe_id = $1`, [id]);
  },
  
  async delete(id) {
    try {
      const result = await db.query(`SELECT * FROM files WHERE id = $1`, [id]);
      const file = result.rows[0];

      fs.unlinkSync(file.path);

      return db.query(`DELETE FROM files WHERE id = $1`, [id]);
    } catch (error) {
      console.error(error);
    }
  },
};
