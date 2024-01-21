import axios from 'axios';

const API_URL = '/api';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export const fetchDashboardData = async () => {
  try {
    const user = getCurrentUser();
    const response = await axios.get(`${API_URL}/dashboard`, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default {
  login,
  logout,
  getCurrentUser,
  fetchDashboardData
};