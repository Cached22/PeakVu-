import axios from 'axios';
import { FEEDBACK_RECEIVED } from '../utils/messageNames';

const API_URL = 'http://www.peakvuroofing.com/api';

const submitFeedback = async (projectId, feedbackData, token) => {
  try {
    const response = await axios.post(`${API_URL}/feedback`, feedbackData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      params: {
        projectId
      }
    });
    if (response.data.message === FEEDBACK_RECEIVED) {
      return response.data;
    } else {
      throw new Error('Feedback submission failed');
    }
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
};

export const feedbackApi = {
  submitFeedback
};