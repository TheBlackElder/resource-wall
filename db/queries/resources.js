const db = require("../connection");

/**
 * users can get resources by category
 * @param {String} category A category type
 * @returns {Promise} A promise to the user
 */

const getResourcesWithCategory = (category) => {
  return db
    .query
      (
      `
      SELECT
        resources.*,
        resources.user_id AS user_id,
        users.username AS user,
        category_id,
        categories.type AS category
      FROM resources
      JOIN users ON users.id = resources.user_id
      JOIN categories ON categories.id = resources.category_id
      GROUP BY resources.id, categories.id, users.username
      HAVING categories.type = $1
      ;
      `
      , [category])
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * users can view all their own resources
 * @param {Number} id A users ID
 * @returns {Promise} A promise to the user
 */

const getResourcesWithUserID = (id) => {
  return db
    .query
      (
      `
      SELECT
        resources.*,
        resources.user_id AS user_id,
        users.username AS user,
        category_id,
        categories.type AS category
      FROM resources
      JOIN users ON users.id = resources.user_id
      JOIN categories ON categories.id = resources.category_id
      GROUP BY resources.id, categories.id, users.username
      HAVING resources.user_id = $1
      ;
      `,[id])
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * users can search for already-saved resources created by any user
 * @param {String} search A user can search for a resource
 * @returns {Promise} A promise to the user
 */

const searchResources = (search) => {
  return db
    .query
      (
      `
      SELECT
        resources.*,
        resources.user_id AS user_id,
        users.username AS user,
        category_id,
        categories.type AS category
      FROM resources
      JOIN users ON users.id = resources.user_id
      JOIN categories ON categories.id = resources.category_id
      WHERE
      GROUP BY resources.id, categories.id, users.username
      HAVING is_private = false
      ;
      `
      , )
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getResourcesWithCategory, getResourcesWithUserID, searchResources };
