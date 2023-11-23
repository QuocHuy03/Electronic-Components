import {
  DELETE_HISTORY_FAILED,
  SEARCH_FAILED,
  SEARCH_HISTORY_FAILED,
  SEARCH_HISTORY_REQUEST,
  SEARCH_HISTORY_SUCCESS,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
} from "./types";

const initialState = {
  search: "",
  historySearch: [],
  error: null,
};

const handleError = (state, actionType, error) => {
  return {
    ...state,
    loading: false,
    error: error,
  };
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
    case SEARCH_HISTORY_REQUEST:
    case DELETE_HISTORY_REQUEST:
      return { ...state, loading: true };

    case SEARCH_SUCCESS:
      return { ...state, search: action.payload };

    case SEARCH_HISTORY_SUCCESS:
      const { historySearch } = state;
      const newHistorySearch = action.payload;

      newHistorySearch.forEach((search) => {
        const existingIndex = historySearch.findIndex(
          (existing) => existing._id === newHistorySearch._id
        );

        if (existingIndex !== -1) {
          historySearch[existingIndex] = search;
        } else {
          historySearch.push(search);
        }
      });

      return {
        ...state,
        historySearch,
      };

    case SEARCH_FAILED:
    case SEARCH_HISTORY_FAILED:
    case DELETE_HISTORY_FAILED:
      return handleError(state, action.type, action.payload);

    default:
      return initialState;
  }
};

export default searchReducer;
