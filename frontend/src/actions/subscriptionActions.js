import axios from 'axios';
import {
  SUBSCRIPTION_STARTED,
  AUTH_SUCCESS
} from '../utils/messageConstants';
import { stripeSecretKey } from '../utils/stripeHelper';

export const startSubscription = (userId, planId, paymentMethodId) => async dispatch => {
  try {
    const response = await axios.post('/create-subscription', {
      userId,
      planId,
      paymentMethodId
    }, {
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`
      }
    });

    dispatch({
      type: SUBSCRIPTION_STARTED,
      payload: response.data
    });

    dispatch({
      type: AUTH_SUCCESS,
      payload: response.data.user
    });

  } catch (error) {
    console.error('Error starting subscription:', error.response ? error.response.data : error.message);
  }
};

export const getSubscriptionDetails = userId => async dispatch => {
  try {
    const response = await axios.get(`/subscriptions/${userId}`);

    dispatch({
      type: SUBSCRIPTION_STARTED,
      payload: response.data
    });

  } catch (error) {
    console.error('Error retrieving subscription details:', error.response ? error.response.data : error.message);
  }
};