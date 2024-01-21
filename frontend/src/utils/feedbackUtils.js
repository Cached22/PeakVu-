import axios from 'axios';

const FEEDBACK_API_BASE_URL = '/feedback';

export const submitFeedback = async (feedbackData) => {
  try {
    const response = await axios.post(FEEDBACK_API_BASE_URL, feedbackData);
    return response.data;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
};