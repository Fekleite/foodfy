const db = require("../../config/db");

module.exports = {
  all() {
    return db.query(`SELECT * FROM recipes ORDER BY created_at`);
  },

  find(id) {
    return db.query(`SELECT * FROM recipes WHERE id = $1`, [id]);
  },

  findByChef(id) {
    return db.query(`SELECT * FROM recipes WHERE chef_id = $1`, [id]);
  },

  create(data) {
    const query = `
      INSERT INTO recipes (
        chef_id,
        title,
        ingredients,
        preparation,
        information
      ) VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;

    const values = [
      Number(data.author),
      data.title,
      (ingredients = `{${String(data.ingredients)}}`),
      (preparation = `{${String(data.preparation)}}`),
      data.information,
    ];

    return db.query(query, values);
  },

  update(data) {
    const query = `
    UPDATE recipes SET
      chef_id=($1),
      title=($2) ,
      ingredients=($3),
      preparation=($4),
      information=($5)
    WHERE id=$6
  `;

    const values = [
      Number(data.author),
      data.title,
      (ingredients = `{${String(data.ingredients)}}`),
      (preparation = `{${String(data.preparation)}}`),
      data.information,
      data.id,
    ];

    return db.query(query, values);
  },

  delete(id) {
    return db.query(`DELETE FROM recipes WHERE id = $1`, [id]);
  },

  files(id) {
    return db.query(`SELECT * FROM recipe_files WHERE recipe_id = $1`, [id]);
  },

  search(filter) {
    const query = `
      SELECT * FROM recipes 
      WHERE recipes.title ILIKE '%${filter}%'
    `;

    return db.query(query);
  },
}