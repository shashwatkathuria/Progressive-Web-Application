# Progressive Web Application [Status completed](https://img.shields.io/badge/Status-finished-2eb3c1.svg) ![MongoDB 3.6.0](https://img.shields.io/badge/Mongodb-3.6.0-blue.svg) ![ExpressJS 4.17.1](https://img.shields.io/badge/ExpressJS-4.17.1-green.svg) ![ReactJS 16.13.1](https://img.shields.io/badge/ReactJS-16.13.1-red.svg) ![Node.js 12.18.3](https://img.shields.io/badge/NodeJS-12.18.3-yellow.svg) ![forthebadge made-with-javascript](https://forthebadge.com/images/badges/made-with-javascript.svg)
---------------------
## MADE USING MERN STACK
---------------------
 Main technical details of the application:

 - Frontend and Backend are separate, communication happens
   through sockets for chatting, and json for every other thing
   for efficiency.

 - Webpack used as a static module bundler to build the assets
   in a efficient and minified form (if production mode). Specifically
   webpack used because it is the industry standard these days.
   Assets here refer JS/JSX, Images, HTML, SCSS (Sass) & CSS

 - NodeJS(14.8.0), ExpressJS and Mongoose used in the backend.
   Backend code is in src/server

 - ReactJS + Redux used in the frontend.
   Frontend code is in src/assets

 - All static assets outputted to dist/ folder.

 - Single page application, i.e., only one html page will be required,
   will serve every thing. Its logic is handled with the help of react-router-dom
   which is why there is only one html page which webpack outputs as index.html.

 - Progressive Web Application - Can be downloaded, manifest and icons provided,
   limited offline functionality

 - Push notifications enabled with the help of web-push and Google Cloud Messaging API

 - Comments given in code wherever relevant

--------------------
HOW TO RUN
--------------------
Install though npm install, then run npm run dev-server in one terminal and
npm run dev-build-assets in another terminal.
- npm install

- npm run dev-server [Continuously watches for development changes and restarts server accordingly]
- npm run prod-server [Start server only once]
- npm run dev-build-assets [Continuously watches for changes and builds frontend assets normally]
- npm run prod-build-assets [Builds minified versions of assets]

NOTE: Assets outputted at dist/ directory.

--------------------
Config
--------------------
src/config/config.js consists of some basic constants.

NOTE: Please also refer to the comments there.
--------------------
Backend
--------------------

------------------------------------------------------------
# src/server/server.js
--------------------

Server side configuration. Routes, chat sockets and server configuration.

# src/server/db.js
--------------------

Database connection with mongoose (MongoDB).

------------------------------------------------------------
# src/server/models
--------------------

## user.js
--------------------
- Hashing, user authentication, modelling of username and password(hash) is taken
care of by passport-local and passport-local-mongoose.
- friends denote the chat friends of user.
- lastestTasksNotified refers to the last time the user was notified of task deadlines.

## chat.js
--------------------
- Chat model is defined here.
- sender and receiver strings denote respective user usernames(which are emails).
- read refers to whether or not the receiver has read the message.

## task.js
--------------------
Consists of deadline, username(email of user) and description.

------------------------------------------------------------

# src/server/routes
--------------------

## users_router.js
--------------------
Handles login, logout, register, adding new friends and fetching friends list.

## chats_router.js
--------------------
Handles /chat paths, in this case only one (html page serving), because rest of the chatting is
handled via sockets.

##tasks_router.js
--------------------
Consists of deadline, username(email of user) and description.

##notifications_router.js
--------------------
Push notifies about upcoming deadline tasks to the user

------------------------------------------------------------
FRONTEND
------------------------------------------------------------

# index.js
--------------------
Every asset(except index.html) to be added to the project must be included here.
Webpack bundles everything from this entry point.

# index.html
--------------------
The only html file, consists of some basic html.

# favicon.png
--------------------
Website icon.

# sw.js
--------------------
Service worker for PWA.

# notifications.js
--------------------
Helper for notifications.

# stylesheets/
--------------------
Sass and css files.

# images/
--------------------
Consists of sample app icons for Progressive Web Application.

------------------------------------------------------------
# javascript/
--------------------

## actions/
--------------------
Consists of redux actions for user, task, chat and common.

## reducers/
--------------------
Consists of pure redux functions for the global store. Consists of user, chat,
task and common reducers and a root reducer which combines all the reducers and exports
them to javascript/components/react_container.jsx.

## constants/
--------------------
Consists of action type constants for redux.

------------------------------------------------------------
## components/
------------------------------------------------------------
 Main UI for the application, consists of JSX files.

 - react_container.jsx
   Starting point, contains basic configuration for redux and react-router-dom
   and adds itself to react-container (React starting point, i.e., root) in index.html

 - app.jsx
   This is where the UI really starts. Consists of all the sections required.

 - chat_section/
   Consists of chat_section.jsx (starting point of chat), chat_list.jsx (chat
   users list), chat_window.jsx (when chatting with a friend) and chat_message.jsx
   which are rendered inside chat_window.jsx.

 - common/
   Consists of navbar, loading spinner and an empty file icons.jsx (icons to be added later).

 - error_section/
   Consists of basic Not Found 404 and 500 internal server error element.

 - home_section/
   Consists of basic home page.

 - task_section/
   Consists of task_section.jsx which renders task rows and new task form.

 - user_auth_section/
   Consists of login and registering forms and corresponding logic along with
   logout button which appears in navbar.

 ------------------------------------------------------------
