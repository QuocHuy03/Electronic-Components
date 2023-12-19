import Http from "../helpers/http";

const fetchAllPayments = async () => {
  try {
    const response = await Http.get(`/payment/getAllPayments`);
    return response.result;
  } catch (error) {
    console.error(error);
  }
};

const fetchPaymentById = async (id) => {
  try {
    const response = await Http.get(`/payment/getPaymentById/${id}`);
    return response.result;
  } catch (error) {
    console.error(error);
  }
};

const fetchPostVNPAYAPI = async (amount) => {
  try {
    const response = await Http.post(`/methodPayment/vnPay`, { amount });
    return response;
  } catch (error) {
    throw error;
  }
};

const fetchPostMOMOAPI = async (amount) => {
  try {
    const response = await Http.post(`/methodPayment/momo`, { amount });
    return response;
  } catch (error) {
    throw error;
  }
};

export const paymentService = {
  fetchAllPayments,
  fetchPaymentById,
  fetchPostVNPAYAPI,
  fetchPostMOMOAPI
};
