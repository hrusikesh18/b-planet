import { combineReducers } from 'redux';
import productReducer from './productReducer';
// Import other reducers if needed

const rootReducer = combineReducers({
  products: productReducer,
  // Add other reducers here
});

export default rootReducer;
