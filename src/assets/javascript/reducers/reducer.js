import { LOG_OUT_USER } from '../constants/user_constants';

import { createStore, applyMiddleware, combineReducers } from 'redux';

import chatReducer from './chat_reducer.js';
import taskReducer from './task_reducer.js';
import userReducer from './user_reducer.js';
import commonReducer from './common_reducer.js';

const appReducer = combineReducers({
   chatReducer: chatReducer,
   taskReducer: taskReducer,
   userReducer: userReducer,
   commonReducer: commonReducer
});

const rootReducer = (state, action) => {

  // Resetting global state on log out
  if (action.type === LOG_OUT_USER) {
    state = {};
  }
  return appReducer(state, action);
}

export default rootReducer;
