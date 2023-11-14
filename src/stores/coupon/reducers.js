
import {
  GET_DISCOUNT_FAILED,
  GET_DISCOUNT_REQUEST,
  GET_DISCOUNT_SUCCESS,
} from "./types";

const initialState = {
  discounts: [],
  totalDiscout: 0,
  loading: false,
  error: null,
};

const handleError = (state, actionType, error) => {
  return {
    ...state,
    loading: false,
    error: error,
  };
};
const couponReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DISCOUNT_REQUEST:
      return { ...state, loading: true };

    case GET_DISCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        discounts: action.payload,
      };

    case GET_DISCOUNT_FAILED:
      return handleError(state, action.type, action.payload);

    default:
      return initialState;
  }
};

export default couponReducer;
