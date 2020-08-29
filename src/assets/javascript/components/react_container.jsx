import React from 'react';
import ReactDOM from 'react-dom';

// Importing things required for redux architecture with react
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/reducer.js';

// Main App
import App from './app.jsx';

// This is the Redux store.
// It is accessed from container components via `connect()`.
// Enable Redux DevTools browser extension.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(thunk))
);

export default class ReactContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store} >
        <App/>
      </Provider>
    );
  }
}
// Rendering starting point of react, i.e., ReactContainer inside
// the html div with id react-container
const wrapper = document.getElementById('react-container');
wrapper ? ReactDOM.render(<ReactContainer/>, wrapper) : false;
