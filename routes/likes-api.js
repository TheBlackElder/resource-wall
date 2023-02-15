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

router.get("/user/:id", (req, res) => {
  const id = req.params.id
  likeQueries
    .getLikesWithUserId(id)
    .then((likes) => {
      res.json(likes);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
