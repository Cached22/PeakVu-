import { SUBSCRIPTION_STARTED, AUTH_SUCCESS } from '../actions/subscriptionActions';

const initialState = {
  subscriptions: [],
  loading: false,
  error: null,
};

function subscriptionReducer(state = initialState, action) {
  switch (action.type) {
    case SUBSCRIPTION_STARTED:
      return {
        ...state,
        subscriptions: [...state.subscriptions, action.payload],
        loading: false,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}

export default subscriptionReducer;