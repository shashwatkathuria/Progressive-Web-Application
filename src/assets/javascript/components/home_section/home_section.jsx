import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import LoadingSpinner from '../common/loading_spinner.jsx';

class HomeSection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Links and their descriptions to be displayed on home section
    // depending onn whether or not user is logged in
    let firstLink, secondLink, firstDescription, secondDescription, firstButton, secondButton;

    if (this.props.user) {
      firstLink = '/chat';
      firstDescription = 'Click below to start chatting';
      firstButton = 'Chat';
      secondLink = '/tasks';
      secondDescription = 'Click below to add tasks';
      secondButton = 'Tasks';
    } else {
      firstLink = '/login';
      firstDescription = 'Click below to login';
      firstButton = 'Login';
      secondLink = '/register';
      secondDescription = 'Register yourself today'
      secondButton = 'Register';
    }

    return (
      <div>
        {!this.props.userLoaded && <LoadingSpinner/>}
        <div className='jumbotron home-section'>
            <h1 className='display-5'>Progressive Web Application</h1>
            <p className='lead'>Chat with people, mark your deadlines and get notified!</p>

            <hr className='my-4'/>

            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <p>{firstDescription}</p>
                <p className='lead'>
                  <Link className='btn btn-primary btn-lg' to={firstLink} role='button'>{firstButton}</Link>
                </p>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <p>{secondDescription}</p>
                <p className='lead'>
                  <Link className='btn btn-primary btn-lg' to={secondLink} role='button'>{secondButton}</Link>
                </p>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  userLoaded: state.userReducer.loaded
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomeSection);
