// src/store.js

import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Named import
import rootReducer from './reducers/rootReducer';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk) // Apply thunk middleware
);

export default store;
