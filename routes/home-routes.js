const express = require('express');
const router = express.Router();
const client = require('../db/connect');


// loads and renders home page
router.get('/', (req, res) => {
  return resources.getAllResources()
  .then((resources) => {
    return res.json(resources);
  })
});

// loads and renders home page
router.get('/home', (req, res) => {
  return res.redirect('/')
});


module.exports = router;
