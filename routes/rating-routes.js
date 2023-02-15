const express = require("express");
const router = express.Router();
const ratingQueries = require("../db/queries/ratings");

//get rating for resource
router.get("/:resource_id", (req, res) => {
  const resource_id = req.params.resource_id;
  ratingQueries
    .getRatingsByResourceID(resource_id)
    .then((ratings) => {
      res.json(ratings);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// add rating
router.post("/:resource_id/rate", (req, res) => {
  const user_id = res.sessions.user_id
  const resource_id = req.params.resource_id;
  const rating = event.target.rating.value
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
router.post("/:resource_id/unrate", (req, res) => {
  const rating_id = req.params.rating_id;
  ratingQueries
    .deleteRating(rating_id)
    .then((ratings) => {
      res.json(ratings);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});


module.exports = router;
