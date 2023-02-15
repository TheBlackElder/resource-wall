const db = require("../connection");

// shows liked videos
const getLikesWithUserId = function (id) {
  const sql = `
    SELECT
      resources.*
    FROM likes
    JOIN resources ON resources.id = likes.resource_id
    JOIN users ON users.id = likes.user_id
    WHERE likes.user_id = $1
    ;
    `;
  return db
    .query(sql, [id])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getLikesCountWithResId = function (id) {
  const sql =
    `
    SELECT
      COUNT(*)
    FROM likes
    WHERE likes.resource_id = $1
    ;
    `
  return db
    .query(sql, [id])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const addLike = function (user_id, resource_id) {
  const sql =
    `
    INSERT INTO
    likes
    (user_id, resource_id)
    VALUES
    ($1, $2);
    `
  return db
    .query(sql, [user_id, resource_id])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

module.exports = { getLikesWithUserId, getLikesCountWithResId, addLike };
