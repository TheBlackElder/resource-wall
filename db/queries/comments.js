const db = require("../connection");

// gets all comments on a resource
const getCommentsByResourceId = function(resource_id) {
  const sql = `SELECT comments.*, users.username AS username FROM comments JOIN users ON user_id = users.id WHERE resource_id = $1;`;
  return db
    .query(sql, [resource_id])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// adds comment on a resource
const AddComment = function(user_id, resource_id, comment) {
  const sql = `INSERT INTO comments (user_id, resource_id, comment) VALUES ($1, $2, $3)`;
  return db
    .query(sql, [user_id, resource_id, comment])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getCommentsByResourceId, AddComment };
