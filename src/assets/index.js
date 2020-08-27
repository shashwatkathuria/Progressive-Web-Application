/*
NOTE: Every file to be used in the project(assets) should be imported here.
      If a file imported here has files imported inside it(directly or indirectly),
      then no need to import them here again, but if you want to, you can.
*/

// Documentation: https://github.com/oliviertassinari/serviceworker-webpack-plugin
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
if ('serviceWorker' in navigator) {
  const registration = runtime.register();
}

import './notifications.js';

// Starting point of react
// All other javascript files will be included by default because
// they have been imported in ReactContainer directly or indirectly
import ReactContainer from './javascript/components/react_container.jsx';

// Importing all the stylesheets

// Bootswatch minified css
// https://bootswatch.com/lux/
import './stylesheets/bootstrap.min.css';

import './stylesheets/main.scss';
import './stylesheets/navbar.scss';
import './stylesheets/variables.scss';
import './stylesheets/user_auth_section.scss';
import './stylesheets/home_section.scss';
import './stylesheets/task_section.scss';
import './stylesheets/chat_section.scss';
import './stylesheets/error_section.scss';
