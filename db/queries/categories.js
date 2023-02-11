const db = require("../connection");

/**
 * Get category ID with the category type
 * @param {String} type The category type
 * @returns {Promise} A promise to the user
 */

const getIdWithCategory = (type) => {
  return db
    .query(`SELECT id FROM categories WHERE type = $1`, [type])
    .then((data) => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * Get the category type with the category ID
 * @param {Number} id The category ID
 * @returns {Promise} A promise to the user
 */

const getCategoryWithId = (id) => {
  return db
    .query(`SELECT type FROM categories WHERE id = $1;`, [id])
    .then((data) => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getIdWithCategory, getCategoryWithId };
