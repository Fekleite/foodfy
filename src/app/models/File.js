const fs = require("fs");

const db = require("../../config/db");

module.exports = {
  createImageRecipe({ filename, path, recipe_id }) {
    const query = `
      INSERT INTO recipe_files (
        name,
        path,
        recipe_id
      ) VALUES ($1, $2, $3)
      RETURNING id
    `;

    const values = [filename, path, recipe_id];

    return db.query(query, values);
  },

  findImageRecipe(id) {
    return db.query(`SELECT * FROM recipe_files WHERE recipe_id = $1`, [id]);
  },
  
  async deleteImageRecipe(id) {
    try {
      const result = await db.query(`SELECT * FROM recipe_files WHERE id = $1`, [id]);
      const file = result.rows[0];

      fs.unlinkSync(file.path);

      return db.query(`DELETE FROM recipe_files WHERE id = $1`, [id]);
    } catch (error) {
      console.error(error);
    }
  },
};
