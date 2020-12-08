import axios from "../helpers/axios";
import { productConstants } from "./constants";

// new action
const getProducts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.GET_ALL_PRODUCTS_REQUEST });
      const res = await axios.post(`product/getProducts`);
      if (res.status === 200) {
        const { products } = res.data;
        dispatch({
          type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
          payload: { products },
        });
      } else {
        dispatch({ type: productConstants.GET_ALL_PRODUCTS_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// modified actrion
export const addProduct = (form) => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.ADD_PRODUCT_REQUEST });
      const res = await axios.post(`product/create`, form);
      if (res.status === 201) {
        dispatch({ type: productConstants.ADD_PRODUCT_SUCCESS });
        dispatch(getProducts());
      } else {
        dispatch({ type: productConstants.ADD_PRODUCT_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// new action
export const deleteProductById = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`product/deleteProductById`, {
        data: { payload },
      });
      dispatch({ type: productConstants.DELETE_PRODUCT_BY_ID_REQUEST });
      if (res.status === 202) {
        dispatch({ type: productConstants.DELETE_PRODUCT_BY_ID_SUCCESS });
        dispatch(getProducts());
      } else {
        const { error } = res.data;
        dispatch({
          type: productConstants.DELETE_PRODUCT_BY_ID_FAILURE,
          payload: {
            error,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
