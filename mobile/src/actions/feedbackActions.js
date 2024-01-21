import { FEEDBACK_RECEIVED } from '../utils/messageNames';
import axios from 'axios';

export const submitFeedback = (projectId, feedbackData) => async dispatch => {
  try {
    const response = await axios.post(`/feedback`, { projectId, ...feedbackData });
    dispatch({
      type: FEEDBACK_RECEIVED,
      payload: response.data
    });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    // Handle error, e.g., dispatching an error action with error message
  }
};