const db = require("../connection");

// gets rating for resource
const getRatingsByResourceID = function (resource_id) {
  const sql = `SELECT ROUND( AVG(rating)::numeric, 2 ) AS rating FROM ratings WHERE resource_id = $1`;
  return db
    .query(sql, [resource_id])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// get ratings of user
const getRatingsByUserID = function (resource_id) {
  const sql = `SELECT ROUND( AVG(rating)::numeric, 2 ) AS rating FROM ratings WHERE user_id = $1`;
  return db
    .query(sql, [resource_id])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// deletes rating if user has already rated
// const updateRating = function (user_id, resource_id, rating) {
//   const sql = `
//   INSERT INTO ratings (user_id, resource_id, rating)
//   VALUES ($1, $2, $3)
//   ON CONFLICT (user_id, resource_id)
//   DO DELETE FROM ratings
//   WHERE user_id = $1 AND resource_id = $2 AND rating = $3
//   RETURNING *;
//   `;
//   return db
//     .query(sql, [user_id, resource_id, rating])
//     .then((result) => {
//       return result.rows[0];
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// };

// adds rating to table
const addRating = function (user_id, resource_id, rating)  {
  const sql = `
  INSERT INTO ratings (user_id, resource_id, rating)
  VALUES($1, $2, $3)
  RETURNING *;
`
  return db
    .query(sql, [user_id, resource_id, rating])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// deletes rating
const deleteRating = function(user_id, resource_id) {
  const sql = `
    DELETE FROM ratings
    WHERE user_id = $1 AND resource_id = $2
    RETURNING *;
  `;
  return db
    .query(sql, [user_id, resource_id, rating])
    .then((result) => {
      return result.rowCount > 0; // return true if a row was deleted
    })
    .catch((err) => {
      console.log(err.message);
    });
};


module.exports = { deleteRating, addRating, getRatingsByResourceID, getRatingsByUserID };
