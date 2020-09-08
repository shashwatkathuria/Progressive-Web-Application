import React from 'react';
import { connect } from 'react-redux';
import { addNewFriend } from '../../actions/user_actions.js';
import { showAlert } from '../../actions/common_actions.js';

// Form for adding a new friend
class AddFriendForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newFriend: '',
      selectedFriend: null
    };
  }

  // React has controlled inputs
  handleNewFriendChange(e) {
    this.setState({ newFriend: e.target.value });
  }

  handleSubmit(e) {
    // Preventing default behaviour
    e.preventDefault();

    // Return if empty details
    if (this.state.newFriend === '') {
      this.props.showAlert('danger', 'Please enter email address of friend to be added');
      return;
    }
    if (this.state.newFriend === this.props.user) {
      this.props.showAlert('danger', 'You cannot add yourself');
      return;
    }
    this.props.addNewFriend(this.state.newFriend);

    // Resetting details
    this.setState({ newFriend: '' });
  }

  render() {
    return (
      <form className='add-friend-form form-inline my-2 my-lg-0' onSubmit={e => this.handleSubmit(e)}>
        <input className='form-control mr-sm-2' type='email' value={this.state.newFriend} onChange={(e) => this.handleNewFriendChange(e)} placeholder='Enter Username'/>
        <button className='btn btn-primary my-2 my-sm-0' type='submit'>Add New Friend</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user
});

const mapDispatchToProps = {
  addNewFriend: addNewFriend,
  showAlert: showAlert
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFriendForm);
