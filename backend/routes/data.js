const express = require('express');
const Data = require('../models/data');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await Data.find({});
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
