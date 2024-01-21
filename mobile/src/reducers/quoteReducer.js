import { QUOTE_CALCULATED, AUTH_SUCCESS } from '../utils/messageNames';

const initialState = {
  quote: null,
  loading: false,
  error: null,
};

const quoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_QUOTE':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case QUOTE_CALCULATED:
      return {
        ...state,
        quote: action.payload,
        loading: false,
      };
    case 'QUOTE_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        quote: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default quoteReducer;