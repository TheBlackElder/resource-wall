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
router.post('/register', (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 12);
  return userQueries
    .addUser(user)
    .then(user => {
      req.session.userId = user.id;
    })
    .catch(e => res.send(e));
});

module.exports = router;
