import { FEEDBACK_RECEIVED } from '../actions/feedbackActions';

const initialState = {
  feedbackList: [],
  feedbackReceived: false,
  error: null
};

function feedbackReducer(state = initialState, action) {
  switch (action.type) {
    case FEEDBACK_RECEIVED:
      return {
        ...state,
        feedbackList: [...state.feedbackList, action.payload],
        feedbackReceived: true
      };
    default:
      return state;
  }
}

export default feedbackReducer;