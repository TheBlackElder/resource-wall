const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/users");


router.get("/", (req, res) => {
  const user = req.session.user
  if (!user) {
    res.redirect('/login')
  }
  const id = req.params.id;
  userQueries
    .getUserById(id)
    .then((resources) => {
      const templateVars = {
        user: user,
        resources: resources,
        hideUserButtons: false
      };
      res.render(`edit-profile`, templateVars);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/", (req, res) => {
  let user = req.session.user
  userQueries
    .updateBio(req.body.bio, user.email)
    .then((results) => {
      req.session.user.bio = req.body.bio;
      req.session.save
      res.redirect('/api/edit');
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
