const db = require("../connection");

/**
 * users can get resources by category
 * @param {String} category A category type
 * @returns {Promise} A promise to the user
 */

const getAllResources = () => {
  const sql = `SELECT resources.*, categories.type AS category
  FROM resources
  JOIN categories ON
categories.id
 = resources.category_id `
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
        users.profile_picture AS profile_picture,
        category_id,
        categories.type AS category
      FROM resources
      JOIN users ON users.id = resources.user_id
      JOIN categories ON categories.id = resources.category_id
      GROUP BY resources.id, categories.id, users.username, users.profile_picture
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
      users.profile_picture AS profile_picture,
      (SELECT ROUND( AVG(rating)::numeric, 2 ) FROM ratings WHERE resources.id = ratings.resource_id) AS rating
      FROM resources
      JOIN users ON users.id = resources.user_id
      LEFT JOIN ratings ON resources.id = ratings.resource_id
      WHERE resources.id = $1
      GROUP BY resources.id, users.username, users.profile_picture
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

const addResource = function (user_id, add) {
  const sql = `
    INSERT INTO
    resources
    (user_id, category_id, title, description, url, media_url, thumbnail, is_video)
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8);
    `;
  return db
    .query(sql, [
      user_id,
      add.category_id,
      add.title,
      add.description,
      add.url,
      add.media_url,
      add.thumbnail,
      add.is_video,
    ])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getResourcesWithCategory, getResourcesWithUserID, getAllResources, getResourceDetailsWithId, addResource};
