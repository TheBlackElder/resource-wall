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
    .then((resource) => {
      // res.json(resources);
      const templateVars = {resource: resource[0]};
      res.render(`my-resources`, templateVars);
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

const getId = function (url) {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

router.get("/details/:id", (req, res) => {
  const id = req.params.id;
  resourceQueries
    .getResourceDetailsWithId(id)
    .then((resource) => {
      const templateVars = {resource: resource[0]};
      if (templateVars.resource.is_video) {
        templateVars.resource.embed = `//www.youtube.com/embed/${getId(templateVars.resource.media_url)}`;
      }
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
  const categoryId = req.params;
  console.log(userId);
  console.log(categoryId);
  // resourceQueries
  //   .addResource(userId, categoryId, title, description, url, mediaUrl, thumbnail, is_video)
  //   .catch((err) => {
  //     res.status(500).json({ error: err.message });
  //   });
})

module.exports = router;
