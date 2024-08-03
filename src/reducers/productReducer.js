import { FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE } from '../actions/productActions';

const initialState = {
  products: [],
  error: null
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload
      };
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default productReducer;
