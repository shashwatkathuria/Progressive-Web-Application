const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const config = require('../config/config.js').module;
const userMiddleware = require('./middleware/user.js');
const app = express();


// To store sessions
const MongoStore = require('connect-mongo')(session);
// Session config
const sessionMiddleware = session({
                  secret: config.server.SESSION_KEY,
                  store: new MongoStore({ url: config.database.DB_URL }),
                  resave: false,
                  saveUninitialized: false,
                  cookie: {
                    maxAge: 1000* 60 * 60 *24 * 365
                  }});
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());


// POST request body parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Logger config
app.use(logger('dev'));

// Passport config
const User = require('./models/user');
const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connecting to database
const db = require('./db.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Index Page
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(config.server.STATIC_FILES_URL, 'index.html'));
});


// Users router
const usersRouter = require('./routes/users_router.js')(passport);
app.use(usersRouter);


// Tasks router
const tasksRouter = require('./routes/tasks_router.js');
app.use('/tasks', tasksRouter);


// Notifications router
const notificationsRouter = require('./routes/notifications_router.js');
app.use(notificationsRouter);


// Chats router
const chatsRouter = require('./routes/chats_router.js');
app.use('/chat', userMiddleware.checkIfLoggedIn, chatsRouter);

// Static files come from this folder
app.use(express.static('dist'));

// 500 Internal Server Error
app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.redirect('/error_500');
});

// 500 page
app.get('/error_500', (req, res) => {
  res.status(500).sendFile(path.resolve(config.server.STATIC_FILES_URL, 'index.html'));
});

// 404 page
app.get('/error_404', (req, res) => {
  res.status(404).sendFile(path.resolve(config.server.STATIC_FILES_URL, 'index.html'));
});

// 404 not found routes
app.get('*', (req, res) => {
  res.redirect('/error_404')
});

// Server listening
const server = app.listen(config.server.PORT, () => console.log(`Started server at: http://localhost:${config.server.PORT}`));

// Chat socket
// All chatting happens in this
const chat = require('./socket/chat_socket.js')(server, sessionMiddleware);


// Gracefully shutting down on Ctrl+C
process.on('SIGINT', function() {
  console.log( '\nGracefully shutting down server due to SIGINT (Ctrl+C)' );
  process.exit(1);
});
