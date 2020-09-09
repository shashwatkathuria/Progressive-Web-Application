import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogoutButton from '../user_auth_section/logout_button.jsx';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='navbar navbar-expand-lg navbar-dark bg-primary'>
        <a className='navbar-brand' href='#'>PWA</a>
        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarColor01' aria-controls='navbarColor01' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarColor01'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>Home <span className='sr-only'>(current)</span></Link>
            </li>

            { !this.props.user && (
              <li className='nav-item'>
                <Link className='nav-link' to='/login'>Login</Link>
              </li>
            )}

            { !this.props.user && (
              <li className='nav-item'>
                <Link className='nav-link' to='/register'>Register</Link>
              </li>
            )}

            { this.props.user && (
              <li className='nav-item'>
                <Link className='nav-link' to='/chat'>Chat</Link>
              </li>
            )}

            { this.props.user && (
              <li className='nav-item'>
                <Link className='nav-link' to='/tasks'>Tasks</Link>
              </li>
            )}

            { this.props.user && (
              <LogoutButton/>
            )}
          </ul>

          { this.props.user && (
            <small className='navbar-user'>Logged in as: {this.props.user}</small>
          )}
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
