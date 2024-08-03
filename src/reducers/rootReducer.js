// src/reducers/rootReducer.js

import { combineReducers } from 'redux';
// Import your individual reducers here
import productReducer from './productReducer'; // Example

const rootReducer = combineReducers({
  products: productReducer, // Example
  // Add other reducers here
});

export default rootReducer;
