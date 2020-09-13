import { SHOW_ALERT, DISMISS_ALERT } from '../constants/common_constants.js';

const defaultState = {
  alertType: null,
  alertMessage: null
};

export default function commonReducer(state = defaultState, action) {
  switch (action.type) {
    case SHOW_ALERT:
     return {
       ...state,
       alertType: action.payload.type,
       alertMessage: action.payload.message
     };
    case DISMISS_ALERT:
     return {
       ...state,
       alertType: null,
       alertMessage: null
     };
    default:
      return state;
  }
}
