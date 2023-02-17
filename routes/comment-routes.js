const express = require("express");
const router = express.Router();
const commentQueries = require("../db/queries/comments");


// gets comments for a resource
router.get("/resources/details/:resource_id", (req, res) => {
  const id = req.params.resource_id
  commentQueries
    .getComments(id)
    .then((comment) => {
      res.json(comment);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// adds comments to the resource
router.post("/resources/details/:resource_id/comment", (req, res) => {
  const user_id = res.sessions.userId;
  if (user_id) {
    const resource_id = req.params.resource_id;
    const comment = req.body;
    commentQueries
      .addComment(user_id, resource_id, comment)
      .then((comment) => {
        res.json(comment);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }
  alert('must be logged in to comment')
});

module.exports = router;
