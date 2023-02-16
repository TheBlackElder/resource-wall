const express = require("express");
const router = express.Router();
const ratingQueries = require("../db/queries/ratings");

//get rating for resource
router.get("/resources/details/:resource_id", (req, res) => {
  const id = req.params.resource_id;
  ratingQueries
    .getRatingsByResourceID(id)
    .then((ratings) => {
      res.json(ratings);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// add rating
router.post("/resources/details/:resource_id/rate", (req, res) => {
  const user_id = res.sessions.user_id;
  const resource_id = req.params.resource_id;
  const rating = req.body
  ratingQueries
    .addRating(user_id, resource_id, rating)
    .then((ratings) => {
      res.json(ratings);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// delete rating
router.post("/resources/details/:resource_id/unrate", (req, res) => {
  const user_id = res.sessions.user_id;
  const resource_id = req.params.resource_id;
  ratingQueries
    .deleteRating(user_id, rating_id)
    .then((ratings) => {
      res.json(ratings);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});


module.exports = router;
