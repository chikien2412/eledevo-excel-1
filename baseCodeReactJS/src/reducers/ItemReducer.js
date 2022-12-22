import * as types from "../constants";
const DEFAULT_STATE = {
  listItem: [],
  isFetching: false,
  dataFetched: false,
  error: false,
  errorMessage: null,
};
// eslint-disable-next-line
export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case types.GET_ITEMS_REQUEST:
    case types.ADD_ITEMS_REQUEST:
    case types.DELETE_ITEMS_REQUEST:
    case types.UPDATE_ITEMS_REQUEST:
    case types.PAGINATE_ITEMS_REQUEST:
    case types.SEARCH_ITEMS_REQUEST:
      return {
        ...state,
        isFetching: true,
        dataFetched: false,
        error: false,
        errorMessage: null,
      };
    case types.GET_ITEMS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dataFetched: true,
        listItem: action.payload.listData,
        error: false,
        errorMessage: null,
      };
    case types.ADD_ITEMS_SUCCESS:
    case types.DELETE_ITEMS_SUCCESS:
    case types.UPDATE_ITEMS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dataFetched: true,
        error: false,
        errorMessage: null,
      };

    case types.PAGINATE_ITEMS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dataFetched: true,
        listItem: action.payload.listData,
        totalPage: action.payload.totalPage,
        activePage: action.payload.activePage,
      };
    case types.SEARCH_ITEMS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dataFetched: true,
        listItem: action.payload.listData,
        totalPage: action.payload.totalPage,
        activePage: action.payload.activePage,
        textSearch: action.payload.textSearch,
      };
    case types.GET_ITEMS_FAILURE:
    case types.ADD_ITEMS_FAILURE:
    case types.DELETE_ITEMS_FAILURE:
    case types.UPDATE_ITEMS_FAILURE:
    case types.PAGINATE_ITEMS_FAILURE:
    case types.SEARCH_ITEMS_FAILURE:
      return {
        ...state,
        isFetching: false,
        dataFetched: false,
        error: true,
        errorMessage: action.payload.errorMessage,
      };
    default:
      return state;
  }
};
