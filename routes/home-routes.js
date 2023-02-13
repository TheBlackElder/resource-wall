const express = require('express');
const router = express.Router();
const resources = require('../db/queries/resources')

// loads and renders home page
router.get('/', (req, res) => {
  return resources.getAllResources()
  .then((resources) => {
    console.log(resources)
    return res.json(resources);
  })
});



module.exports = router;
