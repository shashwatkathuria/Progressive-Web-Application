const express = require('express');
const router = express.Router({ mergeParams: true });
const path = require('path');
const config = require('../../config/config.js').module;
const Task = require('../models/task');

router.get('/', (req, res) => {
  // Serving html page
  res.status(200).sendFile(path.resolve(config.server.STATIC_FILES_URL, 'index.html'));
});

router.get('/all', async (req, res) => {
  if (req.user) {
    // Getting all tasks of a specific user
    const tasks = await Task.find({ username: req.user.username });
    // Returning all tasks of user as response
    res.status(200).json({ tasks: tasks });
  } else {
    res.status(401).json({ message: 'Not authorized.' });
  }
});

router.post('/new', async (req, res) => {
  if (req.user) {
    // Creating a new task and saving it
    const task  = new Task({
      username: req.user.username,
      description: req.body.description,
      deadline: req.body.deadline
    });
    await task.save();
    // Returning the newly saved task as response
    res.status(200).json({ task: task });
  } else {
    res.status(401).json({ message: 'Not authorized.' });
  }
});

module.exports = router;
