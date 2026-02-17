import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { setAuthToken } from './actions/api';
import { loadUser } from './actions/auth';

// If token exists, set auth header
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

// Load logged-in user
store.dispatch(loadUser());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
