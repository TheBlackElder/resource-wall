const db = require("../connection");

// gets all comments on a resource
const getComments = function(resource_id) {
  const sql = `SELECT * FROM comments JOIN resources ON resources.id = comments.resource_id WHERE resources.id = $1`;
  return db
    .query(sql, [resource_id])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getComments };
