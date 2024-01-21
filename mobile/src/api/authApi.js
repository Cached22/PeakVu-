import axios from 'axios';

const API_URL = 'http://your-backend-api-url.com'; // Replace with your actual backend API URL

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.token) {
      // Assuming the response will have a token
      // Store the token in local storage or any other secure place
      localStorage.setItem('userToken', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Error during user login:', error.response.data);
    throw error;
  }
};

const logout = () => {
  // Remove the token from local storage or wherever it's stored
  localStorage.removeItem('userToken');
};

const getDashboardData = async () => {
  try {
    const token = localStorage.getItem('userToken');
    const response = await axios.get(`${API_URL}/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error.response.data);
    throw error;
  }
};

export const authApi = {
  login,
  logout,
  getDashboardData
};