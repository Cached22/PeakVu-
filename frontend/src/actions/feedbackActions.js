import axios from 'axios';
import { FEEDBACK_RECEIVED } from '../utils/messageNames';

export const submitFeedback = (projectId, feedbackData) => async dispatch => {
  try {
    const response = await axios.post(`/feedback`, { projectId, ...feedbackData });
    dispatch({
      type: FEEDBACK_RECEIVED,
      payload: response.data
    });
  } catch (error) {
    // Handle the error appropriately in your application context
    console.error('Error submitting feedback:', error);
  }
};