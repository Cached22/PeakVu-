import axios from 'axios';
import { stripeSecretKey } from '../utils/subscriptionUtils'; // Assuming this file contains the secret key and other related constants

const createSubscription = async (userId, planId, paymentMethodId) => {
  try {
    const response = await axios.post('http://www.peakvuroofing.com/api/create-subscription', {
      userId,
      planId,
      paymentMethodId
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

const getSubscriptions = async (userId) => {
  try {
    const response = await axios.get(`http://www.peakvuroofing.com/api/subscriptions/${userId}`, {
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error retrieving subscriptions:', error);
    throw error;
  }
};

export { createSubscription, getSubscriptions };