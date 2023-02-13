const express = require('express');
const router = express.Router();
const {getAllResources} = require('../db/queries/resources');

const client = require('../db/connect');

// loads and renders home page
router.get('/', (req, res) => {
  getAllResources()
  .then(() => {
    return res.render('/home');
  })
});

module.exports = router;
