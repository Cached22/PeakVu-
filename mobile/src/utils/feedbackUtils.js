import { FEEDBACK_RECEIVED } from '../actions/feedbackActions';
import feedbackApi from '../api/feedbackApi';

export const submitFeedback = async (feedbackData) => {
  try {
    const response = await feedbackApi.post('/feedback', feedbackData);
    if (response.status === 200) {
      alert(FEEDBACK_RECEIVED);
      return true;
    }
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return false;
  }
};