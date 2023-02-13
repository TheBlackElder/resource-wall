const express = require('express');
const router = express.Router();
const

const client = require('../db/connect');

// loads and renders home page
router.get('/', (req, res) => {

  return res.render('/home');
});



// GET /blogposts/
router.get('/', (req, res) => {
  client.query('SELECT * FROM blogposts;')
    .then((response) => {
      res.json(response.rows);
    });
});

// GET /blogposts/:id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  client.query('SELECT * FROM blogposts WHERE id = $1;', [id])
    .then((response) => {
      res.json(response.rows[0]);
    });
});

module.exports = router;
