const express = require("express");
const router = express.Router();
const resourceQueries = require("../db/queries/resources");

router.get("/all", (req, res) => {
  resourceQueries
    .getAllResources()
    .then((resources) => {
      res.json(resources);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/user/:id", (req, res) => {
  const id = req.params.id;
  resourceQueries
    .getResourcesWithUserID(id)
    .then((resources) => {
      res.json(resources);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/cat/:type", (req, res) => {
  console.log(req.params);
  const type = req.params.type;
  resourceQueries
    .getResourcesWithCategory(type)
    .then((resources) => {
      res.json(resources);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/details/:id", (req, res) => {
  const id = req.params.id;
  resourceQueries
    .getResourceDetailsWithId(id)
    .then((resource) => {
      const templateVars = {resource: resource[0]};
      res.render(`resource-details`, templateVars);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
