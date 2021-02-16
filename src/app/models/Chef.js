const db = require("../../config/db");

module.exports = {
  all() {
    return db.query(`SELECT * FROM chefs`);
  },

  find(id) {
    return db.query(`SELECT * FROM chefs WHERE id = $1`, [id]);
  },

  create(data) {
    const query = `
    INSERT INTO chefs (
      name
    ) VALUES ($1)
    RETURNING id
  `;

    const values = [data.name];

    return db.query(query, values);
  },
  
  update(data) {
    const query = `
    UPDATE chefs SET
      name=($1)
    WHERE id=$2
  `;

    const values = [data.name, data.id];

    return db.query(query, values);
  },

  delete(id) {
    return db.query(`DELETE FROM chefs WHERE id = $1`, [id]);
  },

  files(id) {
    return db.query(`SELECT * FROM chef_files WHERE chef_id = $1`, [id]);
  },
  
  getTotalRecipes() {
    const query = `
      SELECT chefs.*, count(recipes) AS total_recipes
      FROM chefs
      LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
      GROUP BY chefs.id 
    `;

    return db.query(query);
  },
};
