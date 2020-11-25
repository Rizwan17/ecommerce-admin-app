import { orderConstants } from "../actions/constants";

const initState = {
  orders: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case orderConstants.GET_CUSTOMER_ORDER_SUCCESS:
      state = {
        ...state,
        orders: action.payload.orders,
      };
      break;
  }

  return state;
};
