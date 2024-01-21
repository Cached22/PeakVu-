import { CREATE_SUBSCRIPTION, GET_SUBSCRIPTIONS, SUBSCRIPTION_ERROR } from './types';
import axios from 'axios';

export const createSubscription = (userId, subscriptionData) => async dispatch => {
  try {
    const res = await axios.post(`/create-subscription`, { userId, ...subscriptionData });
    dispatch({
      type: CREATE_SUBSCRIPTION,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SUBSCRIPTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getSubscriptions = userId => async dispatch => {
  try {
    const res = await axios.get(`/subscriptions/${userId}`);
    dispatch({
      type: GET_SUBSCRIPTIONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SUBSCRIPTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};