const express = require("express");
const router = express.Router();
const likeQueries = require("../db/queries/likes");

/**
 * Get like count of a resource
 */

router.get("/res/:id", (req, res) => {
  const id = req.params.id
  likeQueries
    .getLikesCountWithResId(id)
    .then((likes) => {
      res.json(likes);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

/**
 * Get user liked resources
 */

router.get("/user/", (req, res) => {
  const id = req.session.user.id
  if (!id) {
    res.redirect('/login')
  }
  likeQueries
    .getLikesWithUserId(id)
    .then((likes) => {
      res.json(likes);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/:resource_id", (req, res) => {
  console.log("++++++++", req.params, req.body);
  const { resource_id } = req.params;
  const user_id = req.session.user.id;
  likeQueries
    .addLike(user_id, resource_id)
    .then((likes) => {
      res.json(likes);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
