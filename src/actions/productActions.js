export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await fetch('/products.json');
    const data = await response.json();
    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_FAILURE,
      error
    });
  }
};
