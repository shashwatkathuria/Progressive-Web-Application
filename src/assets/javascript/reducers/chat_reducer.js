import { SET_FETCHED_MESSAGES, NEW_MESSAGE, SET_MESSAGES_READ, SELECT_FRIEND } from '../constants/chat_constants.js';

const defaultState = {
  messages: [],
  selectedFriend: null
};

export default function chatReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_FETCHED_MESSAGES:
      // Sorting messages according to latest time
      const sortedMessages = [...action.payload].sort(function(a, b) { return new Date(b.createdAt) - new Date(a.createdAt); })
      return {
        ...state,
        messages: sortedMessages
      };
    case NEW_MESSAGE:
      // Sorting messages according to latest time
      const allMessages = [...state.messages, action.payload];
      const allSortedMessages = allMessages.sort(function(a, b) { return new Date(b.createdAt) - new Date(a.createdAt); })
      return {
        ...state,
        messages: allSortedMessages
      };
    case SET_MESSAGES_READ:
      // Marking friend (action.payload) messages as read
      const modifiedMessages = state.messages.map(message => {
                                                    const isFriendSender = message.sender === action.payload;
                                                    if (isFriendSender) { message.read = true; }
                                                    return message;
                                                  });
      return {
        ...state,
        messages: [...modifiedMessages]
      }
    case SELECT_FRIEND:
      return {
        ...state,
        selectedFriend: action.payload
      };
    default:
      return state;
  }
}
