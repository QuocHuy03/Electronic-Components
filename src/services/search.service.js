import Http from "../helpers/http";

const http = new Http();

const fetchSearchFilterProducts = async (search) => {
  try {
    const response = await http.get(`/search/getAllSearchFilter/${search}`);
    return response.result;
  } catch (error) {
    console.error(error);
  }
};

const fetchPostHistorySearch = async () => {
  try {
    const response = await http.post(`/search/postHistorySearch`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const fetchHistorySearchByUserID = async () => {
  try {
    const response = await http.get(`/search/getHistorySearchByUserID`);
    return response.result;
  } catch (error) {
    console.error(error);
  }
};

const fetchDeleteAllHistorySearch = async () => {
  try {
    const response = await http.get(`/search/deleteAllHistorySearch`);
    return response.result;
  } catch (error) {
    console.error(error);
  }
};

export const searchService = {
  fetchSearchFilterProducts,
  fetchPostHistorySearch,
  fetchHistorySearchByUserID,
  fetchDeleteAllHistorySearch
};
