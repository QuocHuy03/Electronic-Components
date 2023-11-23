import { searchService } from "../../services/search.service";
import {
  DELETE_HISTORY_FAILED,
  DELETE_HISTORY_REQUEST,
  DELETE_HISTORY_SUCCESS,
  SEARCH_HISTORY_FAILED,
  SEARCH_HISTORY_REQUEST,
  SEARCH_HISTORY_SUCCESS,
  SEARCH_POST_HISTORY_FAILED,
  SEARCH_POST_HISTORY_REQUEST,
  SEARCH_POST_HISTORY_SUCCESS,
} from "./types";

export const getHistorySearch = () => {
  return async (dispatch) => {
    dispatch({
      type: SEARCH_HISTORY_REQUEST,
    });
    try {
      const response = await searchService.fetchHistorySearchByUserID();
      dispatch({
        type: SEARCH_HISTORY_SUCCESS,
        payload: response,
      });
      return response;
    } catch (error) {
      dispatch({
        type: SEARCH_HISTORY_FAILED,
        payload: {
          status: false,
          message: error.message,
        },
      });
      console.log(error);
    }
  };
};

export const postHistorySearch = (data) => {
  return async (dispatch) => {
    dispatch({
      type: SEARCH_POST_HISTORY_REQUEST,
      payload: data,
    });
    try {
      const response = await searchService.fetchPostHistorySearch(data);
      if (response.status === true) {
        dispatch({
          type: SEARCH_POST_HISTORY_SUCCESS,
          payload: response,
        });
        return {
          status: true,
          message: response.message,
        };
      } else {
        dispatch({
          type: SEARCH_POST_HISTORY_FAILED,
        });
        return response;
      }
    } catch (error) {
      dispatch({
        type: SEARCH_POST_HISTORY_FAILED,
        payload: {
          status: false,
          message: error.message,
        },
      });
    }
  };
};

export const deleteAllHistorySearch = (data) => {
  return async (dispatch) => {
    dispatch({
      type: DELETE_HISTORY_REQUEST,
    });
    try {
      const response = await searchService.fetchDeleteAllHistorySearch(data);
      if (response.status === true) {
        dispatch({
          type: DELETE_HISTORY_SUCCESS,
          payload: data,
        });
        return {
          status: true,
          message: response.message,
        };
      } else {
        dispatch({
          type: DELETE_HISTORY_FAILED,
        });
        return response;
      }
    } catch (error) {
      dispatch({
        type: DELETE_HISTORY_FAILED,
        payload: {
          status: false,
          message: error.message,
        },
      });
    }
  };
};
