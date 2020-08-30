function checkIfLoggedIn(req, res, next) {
    // Redirect to login if no user
    // Can be used for pages like chat, tasks, etc
    // because user is required but not present
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

function checkIfNotLoggedIn(req, res, next) {
    // Redirect to index page if user exists
    // Can be used for pages like login, register, etc
    // because user is already there
    if (req.user) {
      res.redirect('/');
    } else {
      next();
    }
}

module.exports.checkIfLoggedIn = checkIfLoggedIn;
module.exports.checkIfNotLoggedIn = checkIfNotLoggedIn;
