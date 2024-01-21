import { AsyncStorage } from 'react-native';
import axios from 'axios';

const AUTH_TOKEN_KEY = 'authToken';

export const setAuthToken = async (token) => {
  try {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
  } catch (error) {
    console.error('Error setting auth token', error);
  }
};

export const getAuthToken = async () => {
  try {
    return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('Error getting auth token', error);
    return null;
  }
};

export const removeAuthToken = async () => {
  try {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('Error removing auth token', error);
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post('http://yourapi.com/login', { email, password });
    const { token } = response.data;
    await setAuthToken(token);
    return token;
  } catch (error) {
    console.error('Error logging in', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await removeAuthToken();
  } catch (error) {
    console.error('Error logging out', error);
  }
};

export const isAuthenticated = async () => {
  try {
    const token = await getAuthToken();
    return !!token;
  } catch (error) {
    console.error('Error checking authentication status', error);
    return false;
  }
};