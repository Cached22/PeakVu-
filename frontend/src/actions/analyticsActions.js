import axios from 'axios';
import { retrieveAnalyticsData } from '../utils/analyticsUtils';

export const GET_ANALYTICS_DATA = 'GET_ANALYTICS_DATA';
export const ANALYTICS_DATA_SUCCESS = 'ANALYTICS_DATA_SUCCESS';
export const ANALYTICS_DATA_FAILURE = 'ANALYTICS_DATA_FAILURE';

const getAnalyticsData = () => ({
  type: GET_ANALYTICS_DATA
});

const analyticsDataSuccess = (data) => ({
  type: ANALYTICS_DATA_SUCCESS,
  payload: data
});

const analyticsDataFailure = (error) => ({
  type: ANALYTICS_DATA_FAILURE,
  payload: error
});

export const fetchAnalyticsData = () => {
  return (dispatch) => {
    dispatch(getAnalyticsData());
    axios.get(retrieveAnalyticsData())
      .then(response => {
        dispatch(analyticsDataSuccess(response.data));
      })
      .catch(error => {
        dispatch(analyticsDataFailure(error.message));
      });
  };
};