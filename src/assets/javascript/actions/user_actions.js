import { REGISTER_USER, LOG_IN_USER, LOG_OUT_USER, FETCH_FRIENDS, USER_LOADING_REQUEST, USER_LOADED_REQUEST } from '../constants/user_constants.js';

import { DISMISS_ALERT, SHOW_ALERT } from '../constants/common_constants.js';

// Registering user through POST request and setting the user in the
// redux store as in login if registered successfully
export const registerUser = (userDetails) => (dispatch) => {
  dispatch({ type: USER_LOADING_REQUEST });

  fetch('/register', {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
  }).then(response => response.json())
    .then(json => {

      if (json.user) {
        dispatch({
            type: REGISTER_USER,
            payload: json
          });
      }
      if (json.error) {
        dispatch({
            type: SHOW_ALERT,
            payload: {
              message: json.error,
              type: 'danger'
            }
          });
      }

    })
    .catch((err) => {
      dispatch({ type: SHOW_ALERT,
                 payload: {
                    message: err.message,
                    type: 'danger'
                  }
              });
    })
    .finally(() => dispatch({ type: USER_LOADED_REQUEST }));
}

// Logging user through POST request and setting the user in the
// redux store if successfully logged in
// Empty object, {}, refers to session request login, will login if session exists
export const logInUser = (userDetails = {}) => (dispatch) => {
  dispatch({ type: USER_LOADING_REQUEST });

  fetch('/login', {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
  }).then(response => response.json())
    .then(json => {
      dispatch({
          type: LOG_IN_USER,
          payload: json
        });
    })
    .catch((err) => {
      // If not a session request, which is an empty object
      // Then show alert
      // 2nd if condition stands for Unauthorized (given by passport)
      // Else condition means not a session request and a regular error
      if (Object.keys(userDetails).length !== 0 && err.message === 'Unexpected token U in JSON at position 0') {
        dispatch({
            type: SHOW_ALERT,
            payload: {
                message: 'Invalid credentials. Try again.',
                type: 'danger'
              }});
      } else if (Object.keys(userDetails).length !== 0) {
        dispatch({
            type: SHOW_ALERT,
            payload: {
                message: err.message,
                type: 'danger'
              }});
      }
    })
    .finally(() => dispatch({ type: USER_LOADED_REQUEST }));

}

// Logging out user and setting everything back to default in './reducer.js'
export const logOutUser = (userDetails) => (dispatch) => {
  dispatch({ type: USER_LOADING_REQUEST });

  fetch('/logout')
    .then(response => response.json())
    .then(json => {
      dispatch({
          type: LOG_OUT_USER,
          payload: json
        });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ALERT,
                 payload: {
                    message: err.message,
                    type: 'danger'
                  }
              });
    })
    .finally(() => dispatch({ type: USER_LOADED_REQUEST }));

}

// Fetching all the friends of the user and then saving them in redux store
export const fetchFriends = () => (dispatch) => {
  dispatch({ type: USER_LOADING_REQUEST });

  fetch('/friends').then(response => response.json())
    .then(json => {
      dispatch({
          type: FETCH_FRIENDS,
          payload: json
        });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ALERT,
                 payload: {
                    message: err.message,
                    type: 'danger'
                  }
              });
    })
    .finally(() => dispatch({ type: USER_LOADED_REQUEST }));

}

// Sending post request of new user to be added and
// then saving in redux store if successfully added
export const addNewFriend = (newFriend) => (dispatch) => {
  dispatch({ type: USER_LOADING_REQUEST });

  fetch('/friends', {
      method: 'POST',
      body: JSON.stringify({ newFriend: newFriend}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
  }).then(response => response.json())
    .then(json => {
      dispatch({
          type: FETCH_FRIENDS,
          payload: json
        });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ALERT,
                 payload: {
                    message: err.message,
                    type: 'danger'
                  }
              });
    })
    .finally(() => dispatch({ type: USER_LOADED_REQUEST }));

}
