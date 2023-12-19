import Http from "../helpers/http";

const fetchCartByUserID = async () => {
  try {
    const response = await Http.get(`/cart/getCartByUserId`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const fetchPostCart = async (data) => {
  try {
    const response = await Http.post(`/cart/addCart`, data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const fetchUpdateCart = async (data) => {
  try {
    const response = await Http.update(`/cart/updateCart`, data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const fetchDeleteCartByID = async (id) => {
  try {
    const response = await Http.delete(`/cart/deleteCartById/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const fetchDeleteCartAllByUserID = async () => {
  try {
    const response = await Http.delete(`/cart/deleteCartAllByUserId`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const cartService = {
  fetchCartByUserID,
  fetchPostCart,
  fetchUpdateCart,
  fetchDeleteCartByID,
  fetchDeleteCartAllByUserID,
};
