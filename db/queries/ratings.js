const db = require("../connection");

// gets rating for
const getRatings = function (resourceID) {
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

module.exports = { getRatings };
