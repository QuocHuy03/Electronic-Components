import Http from "../helpers/http";

const fetchSearchFilterProducts = async (search) => {
  try {
    const response = await Http.get(
      `/product/getAllSearchFilter?query=${search}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

const fetchPostHistorySearch = async (data) => {
  try {
    const response = await Http.post(`/search/postHistorySearch`, {
      nameSearch: data,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

const fetchHistorySearchByUserID = async () => {
  try {
    const response = await Http.get(`/search/getHistorySearchByUserID`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const fetchDeleteAllHistorySearch = async () => {
  try {
    const response = await Http.delete(`/search/deleteHistorySearchAll`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const searchService = {
  fetchSearchFilterProducts,
  fetchPostHistorySearch,
  fetchHistorySearchByUserID,
  fetchDeleteAllHistorySearch,
};
