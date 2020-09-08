import React from 'react';
import { connect } from 'react-redux';
import { fetchFriends } from '../../actions/user_actions.js';
import { selectFriend } from '../../actions/chat_actions.js';

import FriendButton from './friend_button.jsx';

class FriendsList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Fetching all friends of user
    this.props.fetchFriends();
  }

  render() {

    if (this.props.friends == undefined) {
      return <div/>;
    }

    return (
      <div className = 'friends-list'>
        { this.props.friends.map( (friend, index) => <FriendButton key={index} friend={friend}/>) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  friends: state.userReducer.friends
});

const mapDispatchToProps = {
  fetchFriends: fetchFriends,
  selectFriend: selectFriend
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);
