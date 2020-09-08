import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { newMessage, setFetchedMessages } from '../../actions/chat_actions.js';

import AddFriendForm from './add_friend_form.jsx';
import FriendsList from './friends_list.jsx';
import ChatWindow from './chat_window.jsx';
import LoadingSpinner from '../common/loading_spinner.jsx';

import io from 'socket.io-client';

class ChatSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io()
    };
  }

  componentDidMount() {
    // Registering socket events
    const setFetchedMessagesFunction = this.props.setFetchedMessages;
    this.state.socket.on('getAllMessageHistory', function (messages) {
      setFetchedMessagesFunction(messages);
    });
    const newMessage = this.props.newMessage;
    this.state.socket.on('newMessage', function (message) {
      newMessage(message);
    });

    // Initially fetching all messages history
    this.state.socket.emit('getAllMessageHistory');

    // Disconnecting user socket on tab/browser close
    window.addEventListener('beforeunload', (event) => {
      this.unregisterSockets();
    });
  }

  unregisterSockets() {
    // NOTE: Very Important
    // Turning off all socket emit events
    // Otherwise they keep on registering and keep on multiplying accordingly to
    // give multiple chat messages per chat message
    this.state.socket.off('getAllMessageHistory');
    this.state.socket.off('newMessage');
  }

  componentWillUnmount() {
    // Unregistering all socket event listeners when component will unmount
    this.unregisterSockets();
  }

  render() {
    // Redirect to home page if request is loaded and no user is present
    if (!this.props.user && this.props.userLoaded) {
      return <Redirect to='/'/>;
    }

    return (
      <div>
        {!this.props.userLoaded && <LoadingSpinner/>}
        <div className='jumbotron chat-section'>
          <h1 className="display-5">Chat</h1>
          {!this.props.selectedFriend && <AddFriendForm/>}
          {!this.props.selectedFriend && <FriendsList/>}
          {this.props.selectedFriend && <ChatWindow socket={this.state.socket}/> }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  userLoaded: state.userReducer.loaded,
  selectedFriend: state.chatReducer.selectedFriend
});

const mapDispatchToProps = {
  setFetchedMessages: setFetchedMessages,
  newMessage: newMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatSection);
