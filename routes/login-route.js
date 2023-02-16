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
      if (!user) {
        res.redirect('/')
      }
      req.session.userId = user.id;
    })
    .catch(e => res.send(e));
});

//checks login credentials then
router.post('/', (req, res) => {
  console.log('password',req.body.password);
  const hashedpw = bcrypt.hashSync(req.body.password, 12);
  console.log('hashed',hashedpw);
  userQueries
    .login(req.body.email, req.body.password)
    .then(user => {
      if (user) {
        req.session.userEmail = user.email;
        res.redirect('/');
      }
    })
    .catch(e => res.send(e));
});

// logs user out , clears cookies and redirects to home page
router.post('/logout', (req, res) => {
  res.clearCookie('session');
  return res.redirect(`/home`);
});

module.exports = router;


