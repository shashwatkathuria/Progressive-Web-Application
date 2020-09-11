import { NEW_MESSAGE, SET_FETCHED_MESSAGES, SET_MESSAGES_READ, SELECT_FRIEND } from '../constants/chat_constants.js';

// Setting newly fetched message in redux store
export const newMessage = (message) => dispatch => {
  dispatch({
    type: NEW_MESSAGE,
    payload: message
  });
}

// Setting fetched messages in redux store
export const setFetchedMessages = (messages) => dispatch => {
  dispatch({
    type: SET_FETCHED_MESSAGES,
    payload: messages
  });
}

// Setting selected friend in redux store
export const selectFriend = (selectedFriend) => dispatch => {
  dispatch({
    type: SELECT_FRIEND,
    payload: selectedFriend
  });
}

// Marking messages as read in redux store
export const setMessagesRead = (sender) => dispatch => {
  dispatch({
    type: SET_MESSAGES_READ,
    payload: sender
  });
}
