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
  if(type === "all") {
    resourceQueries
      .getAllResources()
      .then((resources) => {
        res.json(resources);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  } else {
    resourceQueries
      .getResourcesWithCategory(type)
      .then((resources) => {
        res.json(resources);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }
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

router.get("/create", (req, res) => {
  res.render('create-resource');
});

router.post("/create", (req, res) => {
  const userId = req.sessions.userId;
  const categoryId = req.params.category_id;
  const title = req.params.title;
  const description = req.params.description;
  const url = req.params.url;
  const mediaUrl = url;
  const thumbnail = req.params.thumbnail;
  const isVideo = req.params.is_video;
  console.log(req.sessions);
  console.log(req.params);
  resourceQueries
    .addResource(userId, categoryId, title, description, url, mediaUrl, thumbnail, isVideo)
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
})

module.exports = router;
