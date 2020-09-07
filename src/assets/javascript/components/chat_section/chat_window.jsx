import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { selectFriend, setMessagesRead } from '../../actions/chat_actions.js';
import { showAlert } from '../../actions/common_actions.js';

import ChatMessage from './chat_message.jsx';

// Displays all the chat messages and an input form to send new messages
class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  componentDidMount() {
    // Frontend and backend marking separate for efficiency
    // Marking the unread messages read on backend
    this.props.socket.emit('receiverReadSenderMessages', this.props.selectedFriend);
    // Marking the unread messages read after 3 seconds on frontend also
    setTimeout(() => this.handleSetMessagesRead(), 3000);
  }

  handleSetMessagesRead() {
    // Backend marking messages read
    this.props.socket.emit('receiverReadSenderMessages', this.props.selectedFriend);
    // Frontend marking messages read
    this.props.setMessagesRead(this.props.selectedFriend)
  }

  // React has controlled inputs
  handleMessageChange(e) {
    this.setState({ message: e.target.value });
  }

  // React has controlled inputs
  handleSubmit(e) {
    // Preventing default behaviour
    e.preventDefault();

    // Return if empty details and show alert
    if (this.state.message === '') {
      this.props.showAlert('danger', 'Cannot send empty message')
      return;
    }
    const messageDetails = {
      receiver: this.props.selectedFriend,
      message: this.state.message
    };

    // Sending new message through socket event
    this.props.socket.emit('newMessage', messageDetails);

    // Resetting message input
    this.setState({ message: '' });
  }

  closeChatWindow(e) {
    // Preventing default behaviour
    e.preventDefault();

    // To close chat window, reset the selectedFriend to null
    this.props.selectFriend(null);
  }

  // If more messages received, mark them as read, as the chat window is already opened
  componentDidUpdate(prevProps) {
    if (prevProps.messages.length !== this.props.messages.length) { this.handleSetMessagesRead(); }
  }

  render() {
    // Getting all messages of selectedFriend and user
    const selectedFriendMessages = this.props.messages.filter( message => message.sender === this.props.selectedFriend || message.receiver === this.props.selectedFriend );

    return (
      <div className='chat-window'>
        <button className='btn btn-primary' onClick={(e) => this.closeChatWindow(e)}>Go Back</button>
        { this.props.selectedFriend && (
          <div className='chat-form-container'>
            <form className='chat-form' onSubmit={e => this.handleSubmit(e)}>
              <input type='text' className='form-control mr-sm-2' type='text' value={this.state.message} onChange={(e) => this.handleMessageChange(e)} placeholder='Enter Message'/>
              <button className='btn btn-primary my-2 my-sm-0' type='submit'>Send</button>
            </form>
            <small>Currently chatting with <b>{this.props.selectedFriend}</b></small>
          </div>
        )}

        {selectedFriendMessages.map( (message, index) => <ChatMessage user={this.props.user} key={index} {...message}/> )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  messages: state.chatReducer.messages,
  selectedFriend: state.chatReducer.selectedFriend
});

const mapDispatchToProps = {
  selectFriend: selectFriend,
  setMessagesRead: setMessagesRead,
  showAlert: showAlert
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow);
