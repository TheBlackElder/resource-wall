const express = require('express');
const router = express.Router();
const userQueries = require("../db/queries/users");
const bcrypt = require('bcryptjs');
let cookieSession = require('cookie-session');
router.use(cookieSession({
  name: 'session',
  keys: ['red rabbits juggling orange juice'],
}));

//checks login credentials then
router.post('/', (req, res) => {
  const hashedpw = bcrypt.hashSync(req.body.password, 12);
  userQueries
    .login(req.body.email, req.body.password)
    .then(user => {
      if (user) {
        req.session.user = user;
        res.redirect('/');
      }
    })
    .catch(error => {
      console.log(error);
      res.status(400).send('wrong log in info');
    });
});

// logs user out , clears cookies and redirects to home page
router.get('/logout', (req, res) => {
  res.clearCookie('session');
  return res.redirect(`/`);
});

module.exports = router;


