import Http from "../helpers/http";

const fetchAllOrders = async () => {
  try {
    const response = await Http.get(`/order/getAllOrders`);
    return response.result;
  } catch (error) {
    console.error(error);
  }
};

const fetchOrderByUserID = async () => {
  try {
    const response = await Http.get(`/order/getOrderByUserID`);
    return response.result;
  } catch (error) {
    console.error(error);
  }
};

const fetchOrderCancel = async (code) => {
  try {
    const response = await Http.post(`/order/cancelOrder/${code}`, {});
    return response;
  } catch (error) {
    console.error(error)
  }
}

const fetchPostOrder = async (method, data) => {
  try {
    const response = await Http.post(`/order/postOrder?method=${method}&source=web`, data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const fetchOrderByCode = async (code) => {
  try {
    const response = await Http.get(`/order/getOrderByCode/${code}`);
    return response.result;
  } catch (error) {
    console.error(error);
  }
}

export const orderService = {
  fetchAllOrders,
  fetchOrderCancel,
  fetchOrderByUserID,
  fetchOrderByCode,
  fetchPostOrder,
};
