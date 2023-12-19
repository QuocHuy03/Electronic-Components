import Http from "../helpers/http";

const fetchAllCoupons = async () => {
  try {
    const response = await Http.get(`/coupon/getAllCoupons`);
    return response.result;
  } catch (error) {
    console.error(error);
  }
};

const fetchCouponByUserID = async () => {
  try {
    const response = await Http.get(`/coupon-user/getCouponUserByUserID`);
    return response.result;
  } catch (error) {
    console.error(error);
  }
};

const fetchPostCoupon = async (data) => {
  try {
    const response = await Http.post(`/coupon-user/postCouponUser`, data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const fetchDeleteCoupon = async (id) => {
  try {
    const response = await Http.delete(`/coupon-user/deleteCouponUser/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const couponService = {
  fetchAllCoupons,
  fetchPostCoupon,
  fetchCouponByUserID,
  fetchDeleteCoupon,
};
