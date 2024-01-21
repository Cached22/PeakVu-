import axios from 'axios';
import { stripeSecretKey } from '../shared/dependencies';

// Utility function to create a new subscription for financing
export const createSubscription = async (userId, planId) => {
  try {
    const response = await axios.post('/create-subscription', {
      userId,
      planId
    }, {
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
};

// Utility function to get subscription details
export const getSubscriptionDetails = async (userId) => {
  try {
    const response = await axios.get(`/subscriptions/${userId}`, {
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching subscription details:', error);
    throw error;
  }
};

// Utility function to cancel a subscription
export const cancelSubscription = async (subscriptionId) => {
  try {
    const response = await axios.post('/cancel-subscription', {
      subscriptionId
    }, {
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    throw error;
  }
};