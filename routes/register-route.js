const express = require('express');
const router = express.Router();
const userQueries = require("../db/queries/users");
const bcrypt = require('bcryptjs');
let cookieSession = require('cookie-session');
router.use(cookieSession({
  name: 'session',
  keys: ['red rabbits juggling orange juice'],
}));

// Create a new user
router.post('/', (req, res) => {
  const user = req.body;
  const password = bcrypt.hashSync(user.password, 12)
  return userQueries
    .userExists(user.username, user.email)
    .then((userExists) => {
      if (userExists && userExists.email === user.email) {
        return res.render('register', {hideUserButtons: true, error: 'email already exists'});
      } else if (userExists && userExists.username === user.username) {
        return res.render('register', {hideUserButtons: true, error: 'username already exists'});
      }
      userQueries
        .addUser(user, password)
        .then((user) => {
          req.session.user = user;
          res.redirect('/')
        })
    })
});

module.exports = router;
