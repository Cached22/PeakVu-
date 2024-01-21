import { RETRIEVE_ANALYTICS_DATA, ANALYTICS_ERROR, SET_ANALYTICS_LOADING } from '../actions/types';

const initialState = {
  analyticsData: null,
  loading: false,
  error: null
};

export default function analyticsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ANALYTICS_LOADING:
      return {
        ...state,
        loading: true
      };
    case RETRIEVE_ANALYTICS_DATA:
      return {
        ...state,
        analyticsData: action.payload,
        loading: false,
        error: null
      };
    case ANALYTICS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
}