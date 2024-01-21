import { stripeSecretKey } from '../config/keys';
import axios from 'axios';
import { SUBSCRIPTION_STARTED } from '../actions/types';

const stripe = require('stripe')(stripeSecretKey);

export const createSubscription = async (customerId, paymentMethodId, priceId) => {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      default_payment_method: paymentMethodId,
      expand: ['latest_invoice.payment_intent'],
    });

    return subscription;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
};

export const cancelSubscription = async (subscriptionId) => {
  try {
    const deletedSubscription = await stripe.subscriptions.del(subscriptionId);
    return deletedSubscription;
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw error;
  }
};

export const retrieveSubscription = async (subscriptionId) => {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    return subscription;
  } catch (error) {
    console.error('Error retrieving subscription:', error);
    throw error;
  }
};

export const handleSubscriptionSuccess = (dispatch, subscription) => {
  dispatch({
    type: SUBSCRIPTION_STARTED,
    payload: subscription,
  });
};

export const fetchUserSubscriptions = async (userId) => {
  try {
    const response = await axios.get(`/subscriptions/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user subscriptions:', error);
    throw error;
  }
};