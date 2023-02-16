const db = require("../connection");

// check if user is logged in
const loggedUser = function (req, res) {
  if (req.session.email) {
    return res.redirect('/');
  }
};

// gets single user with given email
const getUserByEmail = function(email) {
  const sql = `SELECT profile_picture, first_name, last_name, username, bio, email FROM users WHERE email = $1;`;
  return db
    .query(sql, [email])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// gets user info with given ID
const getUserById = function(id) {
  const sql = `SELECT profile_picture, first_name, last_name, username, bio, email FROM users WHERE id = $1;`;
  return db
    .query(sql, [id])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// add new user
const addUser = function(user) {
  const sql = `INSERT INTO users (username, email, password, first_name, last_name, profile_picture, bio)
  VALUES ($1, $2, $3, $4, $5, $6, $7);`;
  return db
    .query(sql, [user.username, user.email, user.password, user.first_name, user.last_name, user.profile_picture, user.bio])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// updates user info
const updateUser = function(user) {
  const sql = `UPDATE users SET first_name = $1, last_name = $2, username = , email = , profile_picture = $3, bio = $4
    WHERE id = $5;`;
  return db
    .query(sql, [user.first_name, user.last_name, user.profile_picture, user.bio, user.id])
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// updates user password
const updatePassword = function() {
  const sql = `UPDATE users SET password = $1
    WHERE username = ${req.session.username};`;
  return db
    .query(sql, [password])
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// deletes user account
const deleteUser = function() {
  const sql = `DELETE FROM users WHERE username = ${req.session.username};`;
  return db
    .query(sql)
    .then((result) => {
      result;
      return res.redirect('/');
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//function to checks login credentials
const login = function (email, password) {
  return getUserByEmail(email)
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    });
}


module.exports = {
  loggedUser,
  addUser,
  getUserByEmail,
  getUserById,
  updateUser,
  updatePassword,
  deleteUser,
  login
};
