import { LOG_IN_USER, LOG_OUT_USER, REGISTER_USER, FETCH_FRIENDS, USER_LOADING_REQUEST, USER_LOADED_REQUEST } from '../constants/user_constants.js';

const defaultState = {
  user: null,
  friends: [],
  loaded: false
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case LOG_IN_USER:
      return {
        ...state,
        user: action.payload.user,
        loaded: true
      };
    case REGISTER_USER:
      return {
        user: action.payload.user,
        loaded: true
      };
    case FETCH_FRIENDS:
      return {
        ...state,
        friends: [...action.payload.friends],
        loaded: true
      };
    case LOG_OUT_USER:
      return {
        ...state,
        loaded: true
      };
    case USER_LOADING_REQUEST:
      return {
        ...state,
        loaded: false
      };
    case USER_LOADED_REQUEST:
      return {
        ...state,
        loaded: true
      };
    default:
      return state;
  }
}
