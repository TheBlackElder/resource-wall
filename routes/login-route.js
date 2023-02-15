const express = require('express');
const router = express.Router();
const userQueries = require("../db/queries/users");
const bcrypt = require('bcryptjs');
let cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ['red rabbits juggling orange juice'],
}));
const bcrypt = require('bcrypt');


// Create a new user
router.post('/register', (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 12);
  return userQueries
    .addUser(user)
    .then(user => {
      if (!user) {
        res.send({ error: "error" });
        return;
      }
      req.session.userId = user.id;
    })
    .catch(e => res.send(e));
});

//checks login credentials then
router.post('/login', (req, res) => {
  const {email, password} = req.body;
  userQueries
    .login(email, password)
    .then(user => {
      if (!user) {
        res.send({ error: "error"});
        return;
      }
      req.session.userId = user.id;
      res.redirect('/home')
    })
    .catch(e => res.send(e));
});

// logs user out , clears cookies and redirects to home page
app.post('/logout', (req, res) => {
  res.clearCookie('session');
  return res.redirect(`/home`);
});


