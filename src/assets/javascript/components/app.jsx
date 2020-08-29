import React from 'react';
import { connect } from 'react-redux';
import { Route, Link, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { logInUser } from '../actions/user_actions.js';

import Navbar from './common/navbar.jsx';
import HomeSection from './home_section/home_section.jsx';
import LoginSection from './user_auth_section/login_section.jsx';
import RegistrationSection from './user_auth_section/registration_section.jsx';
import ChatSection from './chat_section/chat_section.jsx';
import TaskSection from './task_section/task_section.jsx';
import Error404 from './error_section/error_404.jsx';
import Error500 from './error_section/error_500.jsx';
import LoadingSpinner from './common/loading_spinner.jsx';
import Alert from './common/alert.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    // Getting user through session if present
    this.props.logInUser();
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar/>
          <Alert/>
          <Switch>
            <Route exact path='/' component={HomeSection}/>
            <Route path='/login' component={LoginSection}/>
            <Route path='/register' component={RegistrationSection}/>
            <Route path='/chat' component={ChatSection}/>
            <Route path='/tasks' component={TaskSection}/>
            <Route path='/error_404' component={Error404}/>
            <Route path='/error_500' component={Error500}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  userLoaded: state.userReducer.loaded
});

const mapDispatchToProps = {
  logInUser: logInUser
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
