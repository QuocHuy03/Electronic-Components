import { couponService } from "../../services/coupon.service";
import {
  GET_DISCOUNT_FAILED,
  GET_DISCOUNT_REQUEST,
  GET_DISCOUNT_SUCCESS,
} from "./types";

export const getCoupon = () => { // của userID
  return async (dispatch) => {
    dispatch({
      type: GET_DISCOUNT_REQUEST,
    });

    try {
      const response = await couponService.fetchCouponByUserID();
      dispatch({
        type: GET_DISCOUNT_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: GET_DISCOUNT_FAILED,
        payload: {
          status: false,
          message: error.message,
        },
      });
    }
  };
};

export const applyCoupon = (data) => {
  return async () => {
    try {
      const response = await couponService.fetchPostCoupon(data);
      if (response.status === true) {
        return {
          status: true,
          message: response.message,
        };
      } else {
        return response;
      }
    } catch (error) {
      return {
        status: false,
        message: error.message,
      };
    }
  };
};

export const uncheckedCoupon = (data) => {
  return async () => {
    try {
      const response = await couponService.fetchDeleteCoupon(data.couponID);
      if (response.status === true) {
        return response;
      } else {
        return response;
      }
    } catch (error) {
      return {
        status: false,
        message: error.message,
      };
    }
  };
};
