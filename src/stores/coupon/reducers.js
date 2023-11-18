import {
  APPLY_COUPON_FAILED,
  APPLY_COUPON_REQUEST,
  APPLY_COUPON_SUCCESS,
  GET_DISCOUNT_FAILED,
  GET_DISCOUNT_REQUEST,
  GET_DISCOUNT_SUCCESS,
  GET_FILTER_COUPON_PRODUCT_FAILED,
  GET_FILTER_COUPON_PRODUCT_REQUEST,
  GET_FILTER_COUPON_PRODUCT_SUCCESS,
  TOTAL_DISCOUNT_TO_PRODUCT,
  UNAPPLY_COUPON_FAILED,
  UNAPPLY_COUPON_REQUEST,
  UNAPPLY_COUPON_SUCCESS,
} from "./types";

const initialState = {
  discounts: [],
  coupons: [],
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
    case GET_FILTER_COUPON_PRODUCT_REQUEST:
    case APPLY_COUPON_REQUEST:
    case UNAPPLY_COUPON_REQUEST:
    case GET_DISCOUNT_REQUEST:
      return { ...state, loading: true };

      case GET_FILTER_COUPON_PRODUCT_SUCCESS:
        const { carts, coupon } = action.payload;
        const { coupons } = state;
      
        // Lặp qua từng sản phẩm trong giỏ hàng
        for (const cartItem of carts) {
          // Kiểm tra xem sản phẩm có coupon từ danh sách không
          const foundCoupon = coupon?.find(
            (huydev) => huydev.product._id === cartItem.productID
          );

      
          if (foundCoupon) {
            // Nếu có coupon và chưa tồn tại trong mảng coupons, thêm vào
            if (!coupons.some(existingCoupon => existingCoupon.code === foundCoupon.code)) {
              coupons.push(foundCoupon);
            }
          }
        }
      
        return {
          ...state,
          coupons,
        };
      
    case GET_DISCOUNT_SUCCESS:
      return {
        ...state,
        discounts: action.payload,
      };

    case TOTAL_DISCOUNT_TO_PRODUCT:
      return {
        ...state,
        totalDiscout: action.payload,
      };

    case APPLY_COUPON_SUCCESS:
      return {
        ...state,
        discounts: [...state.discounts, action.payload],
      };
    case UNAPPLY_COUPON_SUCCESS:
      return {
        ...state,
        discounts: state.discounts.filter(
          (e) => e.coupon._id !== action.payload
        ),
      };
    case GET_FILTER_COUPON_PRODUCT_FAILED:
    case GET_DISCOUNT_FAILED:
    case APPLY_COUPON_FAILED:
    case UNAPPLY_COUPON_FAILED:
      return handleError(state, action.type, action.payload);

    default:
      return initialState;
  }
};

export default couponReducer;
