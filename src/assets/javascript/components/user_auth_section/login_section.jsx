import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logInUser } from '../../actions/user_actions.js';

import Form from './form.jsx';
import LoadingSpinner from '../common/loading_spinner.jsx';

class LoginSection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Redirecting to home if request is loaded and user is present
    // Component not relevant if a user is already logged in
    if (this.props.user && this.props.userLoaded) {
      return <Redirect to='/'/>;
    }

    return (
      <div>
        {!this.props.userLoaded && <LoadingSpinner/>}
        <div className='jumbotron login-section'>
          <Form type='login'/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  userLoaded: state.userReducer.loaded
});

const mapDispatchToProps = ({
});


export default connect(mapStateToProps, mapDispatchToProps)(LoginSection);
