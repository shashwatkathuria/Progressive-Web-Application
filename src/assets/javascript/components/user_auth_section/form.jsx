import React from 'react';
import { connect } from 'react-redux';
import { registerUser, logInUser } from '../../actions/user_actions.js';
import { showAlert } from '../../actions/common_actions.js';

// Form for Register and Login (according to props)
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  // React has controlled inputs
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  // React has controlled inputs
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  // React has controlled inputs
  handleConfirmPasswordChange(e) {
    this.setState({ confirmPassword: e.target.value });
  }

  handleLogin(e) {
    // Preventing default behaviour of form
    e.preventDefault();

    // Return if empty details and show alert
    if (this.state.email === '') {
      this.props.showAlert('danger', 'Please enter email address');
      return;
    }
    if (this.state.password === '') {
      this.props.showAlert('danger', 'Please enter password');
      return;
    }

    const userDetails = {
      username: this.state.email,
      password: this.state.password
    };

    this.props.logInUser(userDetails);

    // Reset user and password
    this.setState({
      email: '',
      password: ''
    });
  }

  handleRegister(e) {
    // Preventing default behaviour of form
    e.preventDefault();

    // Return if empty details and show alert
    if (this.state.email === '') {
      this.props.showAlert('danger', 'Please enter email address');
      return;
    }
    if (this.state.password === '') {
      this.props.showAlert('danger', 'Please enter password');
      return;
    }
    if (this.state.confirmPassword === '') {
      this.props.showAlert('danger', 'Please confirm password');
      return;
    }
    if (this.state.password !== this.state.confirmPassword) {
      this.props.showAlert('danger', 'Passwords do not match');
      return;
    }

    const userDetails = {
      username: this.state.email,
      password: this.state.password
    };

    this.props.registerUser(userDetails);

    // Reset user, password and confirmPassword
    this.setState({
      email: '',
      password: '',
      confirmPassword: ''
    });

  }

  render() {

    return (
        <form className={`${this.props.type}-form`} onSubmit={e => this.props.type === 'register' ? this.handleRegister(e) : this.handleLogin(e)}>
          <h1>{this.props.type}</h1>
          <fieldset>
            <div className='form-group'>
              <label>Email address</label>
              <input type='email' className='form-control' value={this.state.email} onChange={(e) => this.handleEmailChange(e)} aria-describedby='emailHelp' placeholder='Enter email'/>
              <small id='emailHelp' className='form-text text-muted'>We'll never share your email with anyone else.</small>
            </div>
            <div className='form-group'>
              <label>Password</label>
              <input type='password' className='form-control' name='password' value={this.state.password}  onChange={(e) => this.handlePasswordChange(e)} placeholder='Enter password'/>
            </div>
            { this.props.type === 'register' && (
              <div className='form-group'>
                <label>Confirm Password</label>
                <input type='password' className='form-control' name='confirm-password' value={this.state.confirmPassword} onChange={(e) => this.handleConfirmPasswordChange(e)} placeholder='Enter password again'/>
              </div>
            )}
            <button type='submit' className='btn btn-primary'>{this.props.type}</button>
          </fieldset>
        </form>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
  logInUser: logInUser,
  registerUser: registerUser,
  showAlert: showAlert
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
