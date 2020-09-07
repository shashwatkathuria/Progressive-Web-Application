import React from 'react';
import { connect } from 'react-redux';
import { selectFriend } from '../../actions/chat_actions.js';
import moment from 'moment';

class FriendsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Getting friend username and latest chat information
    const friend = this.props.friend;
    const friendMessages = this.props.messages.filter(message => message.sender === friend || message.receiver === friend);
    const friendSenderMessages = friendMessages.filter(message => message.sender === friend);
    const unReadMessages = friendSenderMessages.filter(message => !message.read);

    return (
      <button className='friend-button btn btn-primary' onClick={e => this.props.selectFriend(friend)}>
          <div className='friend-latest-information'>
            <h6 className='text-white'>{friend}</h6>
            {unReadMessages.length > 0 && (
              <span className="new-messages-badge badge badge-light">{unReadMessages.length} New</span>
            )}
          </div>
          {friendMessages.length > 0 && (
            <>
            <span className='latest-message'>: {friendMessages[0].message}</span>
            <small className='latest-message-time'>{moment(friendMessages[0].createdAt).fromNow()}</small>
            </>
          )}
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  friends: state.userReducer.friends,
  messages: state.chatReducer.messages
});

const mapDispatchToProps = {
  selectFriend: selectFriend
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);
