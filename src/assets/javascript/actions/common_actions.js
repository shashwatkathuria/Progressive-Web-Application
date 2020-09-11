import { SHOW_ALERT, DISMISS_ALERT } from '../constants/common_constants.js';

// To dismiss an alert
export const dismissAlert = () => dispatch => {
  dispatch({ type: DISMISS_ALERT });
}

// To show an alert
// This kind of dispatch is also used in other action files as
// this is a common type of alert which can be used as and when
// required for the whole application
export const showAlert = (type, message) => dispatch => {
  dispatch({ type: SHOW_ALERT,
             payload: {
               type: type,
               message: message
             }});
}
