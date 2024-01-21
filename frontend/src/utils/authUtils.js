import axios from 'axios';
import jwtDecode from 'jwt-decode';

const API_URL = '/api'; // Replace with actual API URL

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return jwtDecode(token);
  } catch (error) {
    console.error('Login failed:', error.response.data.message);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getCurrentUser = () => {
  try {
    const token = localStorage.getItem('token');
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }
  try {
    const { exp } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
      logout();
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};