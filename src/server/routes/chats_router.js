const express = require('express');
const router = express.Router();
const path = require('path');
const config = require('../../config/config.js').module;

router.get('/', async (req, res) => {
  // Serving html page
  res.status(200).sendFile(path.resolve(config.server.STATIC_FILES_URL, 'index.html'));
});

module.exports = router;
