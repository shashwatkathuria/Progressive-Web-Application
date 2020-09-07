import React from 'react';
import moment from 'moment';

const ChatMessage = (props) => {

  // If message sent by a sender, appears on left
  // Else if sent by a receiver, appears on right
  const isSender = props.sender === props.user;
  const alignment = isSender ? 'left' : 'right';

  // If the user is a receiver, and not read the message
  // Then it means that it is a new message
  const isNewMessage = !props.read && !isSender;

  return (
    <div className='chat-message-container'>
      <div className={`alert alert-dismissible alert-primary chat-message chat-message-${alignment}`}>
        {props.message}
        <br/>
        <small>{moment(props.createdAt).fromNow()} {isNewMessage ? '(New)' : ''}</small>
      </div>
    </div>
  );
}

export default ChatMessage;
