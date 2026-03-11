import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

// Apply middleware with DevTools support
const composeEnhancers = composeWithDevTools(applyMiddleware(...middleware));

const store = createStore(rootReducer, initialState, composeEnhancers);

export default store;
