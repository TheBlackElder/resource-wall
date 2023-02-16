const express = require("express");
const router = express.Router();
const commentQueries = require("../db/queries/comments");

// gets comments for a resource
router.get("/", (req, res) => {
  console.log(req.query);
  // res.send("hi");
  const {resource_id} = req.query;
  commentQueries
    .getCommentsByResourceId(resource_id)
    .then((comments) => {
      res.json(comments);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// router.get("/", (req, res) => {
//   const id = req.params.resource_id;
//   let num = 1
//   commentQueries
//     .getComments(id)
//     .then((comments) => {
//       comments.forEach((comment) => {
//         console.log(comment);
//         num++;
//         console.log(num);
//         // Do something with each comment here
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({ error: err.message });
//     });
// });


module.exports = router;
