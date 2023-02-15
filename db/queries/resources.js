const db = require("../connection");

/**
 * users can get resources by category
 * @param {String} category A category type
 * @returns {Promise} A promise to the user
 */

const getAllResources = () => {
<<<<<<< HEAD
  const sql = `SELECT * FROM resources`;
=======
  const sql = `SELECT resources.*, categories.type AS category
  FROM resources
  JOIN categories ON
categories.id
 = resources.category_id `
>>>>>>> master
  return db
    .query(sql)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getResourcesWithCategory = (category) => {
  const sql = `
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
      `;
  return db
    .query(sql, [category])
    .then((result) => {
      return result.rows;
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
  const sql = `
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
      `;
  return db
    .query
    (sql,[id])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getResourceDetailsWithId = (id) => {
  const sql = `
    SELECT
      resources.*,
      users.username AS username,
      (SELECT AVG(rating) FROM ratings WHERE resources.id = ratings.resource_id) AS rating
      FROM resources
      JOIN users ON users.id = resources.user_id
      LEFT JOIN ratings ON resources.id = ratings.resource_id
      WHERE resources.id = $1
      GROUP BY resources.id, users.username
      ;
    `;
  return db
    .query
      (sql, [id])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const addResource = function (user_id, category_id, title, description, url, medial_url, thumbnail, is_video) {
  const sql = `
    INSERT INTO
    resources
    (user_id, category_id, title, description, url, medial_url, thumbnail, is_video)
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8);
    `;
  return db
    .query(sql, [
      user_id,
      category_id,
      title,
      description,
      url,
      medial_url,
      thumbnail,
      is_video
    ])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getResourcesWithCategory, getResourcesWithUserID, getAllResources, getResourceDetailsWithId, addResource};
