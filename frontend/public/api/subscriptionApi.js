import axios from 'axios';

const API_URL = '/api';

// Create a new subscription for financing
export const createSubscription = async (userId, subscriptionData) => {
  try {
    const response = await axios.post(`${API_URL}/create-subscription`, { userId, ...subscriptionData });
    return response.data;
  } catch (error) {
    console.error('Error creating subscription', error.response.data);
    throw error;
  }
};

// Get subscription details for a user
export const getSubscriptions = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/subscriptions/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching subscriptions', error.response.data);
    throw error;
  }
};