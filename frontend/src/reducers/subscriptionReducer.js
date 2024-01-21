import {
  SUBSCRIPTION_STARTED,
  SUBSCRIPTION_FAILED,
  FETCH_SUBSCRIPTIONS_SUCCESS,
  FETCH_SUBSCRIPTIONS_FAILED
} from '../actions/subscriptionActions';

const initialState = {
  subscriptions: [],
  error: null,
  loading: false
};

const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBSCRIPTION_STARTED:
      return {
        ...state,
        loading: true
      };
    case SUBSCRIPTION_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case FETCH_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        subscriptions: action.payload
      };
    case FETCH_SUBSCRIPTIONS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default subscriptionReducer;