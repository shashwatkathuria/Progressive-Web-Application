import React from 'react';
import { connect } from 'react-redux';
import { logOutUser } from '../../actions/user_actions.js';

// This button(link) appears on the navbar
class LogoutButton extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLogout(e) {
    // Preventing default behaviour
    e.preventDefault();
    // Logging out user
    this.props.logOutUser();
  }

  render() {
    return (
      <a className='nav-link' href='#' onClick={e => this.handleLogout(e)}>Logout</a>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
  logOutUser: logOutUser
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
