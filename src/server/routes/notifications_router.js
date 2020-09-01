const express = require('express');
const router = express.Router({ mergeParams: true });
const webpush = require('web-push');
const moment = require('moment');
const Task = require('../models/task');
const config = require('../../config/config.js').module;

// Setting up push notifications configuration
webpush.setGCMAPIKey(config.notifications.GCM_API_KEY);
webpush.setVapidDetails(
  config.notifications.DOMAIN_MAIL_TO,
  config.notifications.VAPID_PUBLIC_KEY,
  config.notifications.VAPID_PRIVATE_KEY
);

// Task deadline notifications
router.post("/notifications/tasks", async (req, res, next) => {
  const current = new Date();
  // If the laast time user was notified about task deadlines was more than 12 hours ago,
  // go ahead and notify user
  if (req.user && moment(current).diff(moment(req.user.lastestTasksNotified), 'hours') > 12) {
    const subscription = req.body;
    res.sendStatus(200);
    // Getting all upcoming tasks sorted by nearest first
    const upcomingTasks = await Task.find({ username: req.user.username, deadline: { $gte: new Date()} }).sort({deadline: 'asc'});
    // Converting all to a string to be given to sendNotification
    const descriptionAndTime = upcomingTasks.map(task => task.description + '\t (' + moment(task.deadline).fromNow() + ')')
    const notificationString = descriptionAndTime.join('\n');

    if (upcomingTasks.length > 0) {
      // Sending push notification
      webpush.sendNotification(subscription, JSON.stringify({
        title: "Upcoming Tasks",
        body: notificationString,
      }));
    }
    // Save current time as latest tasks notified date
    req.user.lastestTasksNotified = new Date();
    await req.user.save();
  } else {
    res.sendStatus(200);
  }
})

module.exports = router;
