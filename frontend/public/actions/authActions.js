import axios from 'axios';
import { AUTH_SUCCESS } from '../utils/authUtils';

export const login = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post('/login', credentials);
    dispatch({
      type: AUTH_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    // Handle the error according to your needs
    console.error('Error during login:', error.response || error.message);
  }
};

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};

export const fetchDashboardData = (token) => async (dispatch) => {
  try {
    const response = await axios.get('/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Dispatch an action with the dashboard data
    // Replace 'DASHBOARD_DATA_SUCCESS' with the actual action type you have defined
    dispatch({
      type: 'DASHBOARD_DATA_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    // Handle the error according to your needs
    console.error('Error fetching dashboard data:', error.response || error.message);
  }
};