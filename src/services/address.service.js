import Http from "../helpers/http";

const http = new Http();

const fetchAddressByUserID = async () => {
  try {
    const response = await http.get(`/address/getAddressByUserID`);
    return response.result;
  } catch (error) {
    console.error(error);
  }
};

const fetchPostAddress = async (data) => {
  try {
    const response = await http.post(`/address/postAddress`, data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const fetchUpdateAddress = async (data) => {
  try {
    const response = await http.post(`/address/updateAddress`, data);
    return response;
  } catch (error) {
    console.error(error);
  }
};


const fetchDeleteAddress = async (id) => {
  try {
    const response = await http.delete(`/address/deleteAddress/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const AddressService = {
  fetchUpdateAddress,
  fetchPostAddress,
  fetchAddressByUserID,
  fetchDeleteAddress,
};
