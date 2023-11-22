import {
  DELETE_HISTORY_FAILED,
  SEARCH_FAILED,
  SEARCH_HISTORY_FAILED,
  SEARCH_HISTORY_REQUEST,
  SEARCH_REQUEST,
} from "./types";

const initialState = {
  search: "",
  historySearch: "",
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

    case SEARCH_FAILED:
    case SEARCH_HISTORY_FAILED:
    case DELETE_HISTORY_FAILED:
      return handleError(state, action.type, action.payload);

    default:
      return initialState;
  }
};

export default searchReducer;
