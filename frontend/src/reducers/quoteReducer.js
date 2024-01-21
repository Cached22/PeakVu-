import { QUOTE_CALCULATED, AUTH_SUCCESS } from '../actions/types';

const initialState = {
  quote: null,
  loading: true,
  error: {}
};

export default function quoteReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case QUOTE_CALCULATED:
      return {
        ...state,
        quote: payload,
        loading: false
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}