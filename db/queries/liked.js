const db = require("../connection");

// shows liked videos
const getLiked = function () {
  const sql = `SELECT * FROM resources JOIN likes ON resource_id = resources.id WHERE likes.user_id = ${req.sessions.user_id}`
  return pool.query(sql)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getLiked };
