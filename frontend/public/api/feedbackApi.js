import axios from 'axios';

const API_URL = '/api';

export const submitFeedback = async (projectId, feedbackData) => {
  try {
    const response = await axios.post(`${API_URL}/feedback`, {
      projectId,
      ...feedbackData
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting feedback:', error.response.data);
    throw error;
  }
};

export const getFeedbackForProject = async (projectId) => {
  try {
    const response = await axios.get(`${API_URL}/feedback/${projectId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching feedback for project:', error.response.data);
    throw error;
  }
};