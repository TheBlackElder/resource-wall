const express = require('express');
const router = express.Router();
const

const client = require('../db/connect');

// loads and renders home page
router.get('/', (req, res) => {
// get all resources then render page
  return res.render('/home');
});

module.exports = router;
