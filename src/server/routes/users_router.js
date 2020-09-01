const express = require('express');
const router = express.Router();
const path = require('path');
const config = require('../../config/config.js').module;
const User = require('../models/user.js');

module.exports = function (passport) {

  router.get('/register', (req, res) => {
    // Serving html page
    res.status(200).sendFile(path.resolve(config.server.STATIC_FILES_URL, 'index.html'));
  });

  router.get('/login', (req, res) => {
    // Serving html page
    res.status(200).sendFile(path.resolve(config.server.STATIC_FILES_URL, 'index.html'));
  });

  router.post('/register', async (req, res) => {
    // Registering new user
    User.register(new User({ username : req.body.username }), req.body.password, function (err, account) {
        // If error, returning error as response
        if (err) { res.json({ error: err.message }); }

        // Authenticating the newly created user for session
        passport.authenticate('local')(req, res, function () {
          // Success, returning user username(email)
          res.status(200).json({ user: req.user.username });
        });
    });
  });

  router.post('/login', async (req, res) => {
    if (req.user) {
      // If user session
      // Success, returning user username(email)
      res.status(200).json({ user: req.user.username });
    } else {
      // Authenticating the newly created user for session
      passport.authenticate('local')(req, res, function () {
        // Success, returning user username(email)
        res.status(200).json({ user: req.user.username });
      });
    }
  });

  router.get('/logout', async (req, res) => {
    // Logout function given by passport inside request object to remove session and log out
    req.logout();
    // Success
    res.json({ message: 'Successfully logged out' });
  })

  router.get('/friends', async (req, res) => {
    if (req.user) {
      // If user exists (session)
      // Return all friends of user as response
      res.status(200).json({ friends: req.user.friends });
    } else {
      // No session, user not logged in
      res.status(401).json({ message: 'Not authorized.' });
    }
  });

  router.post('/friends', async (req, res) => {
    if (req.user) {
      // If user exists (session)
      // Getting new friend to be added
      const newFriend = await User.findOne({ username: req.body.newFriend });
      // If the new friend is a valid user and not the same as the user who wants to add
      if (newFriend && newFriend.username !== req.user.username) {

        // Add user as a friend for new friend
        newFriend.friends.push(req.user.username);
        // Preventing any duplication
        let friends = [...new Set(newFriend.friends)];
        newFriend.friends = friends;
        // Saving
        await newFriend.save();

        // Add new friend as a friend for user
        req.user.friends.push(req.body.newFriend);
        // Preventing any duplication
        friends = [...new Set(req.user.friends)];
        req.user.friends = friends;
        // Saving
        await req.user.save();
      }
      // Redirect to /friends which returns the friend list(if session logged in)
      res.redirect('/friends');
    } else {
      // No session, user not logged in
      res.status(401).json({ message: 'Not authorized.' });
    }
  });

  return router;
}
