const db = require("../connection");

// gets rating for resource
const getRatingsByResourceID = function (resourceID) {
  const sql = `SELECT AVG(rating) FROM ratings WHERE resources_id = $1`
  return db
    .query(sql, [resource])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// get ratings of user
const getRatingsByUserID = function (resourceID) {
  const sql = `SELECT AVG(rating) FROM ratings WHERE user_id = $1`
  return db
    .query(sql, [resource])
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
const addRating = function (user_id, resource_id, rating) => {
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
const deleteRating = function(user_id, resource_id) => {
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
