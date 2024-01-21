import axios from 'axios';
import { AsyncStorage } from 'react-native';

const BASE_URL = 'http://api.peakvuroofing.com'; // Replace with actual API URL

const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.error('Error getting auth token', error);
  }
};

export const fetchMaterialPrices = async () => {
  try {
    const token = await getAuthToken();
    const response = await axios.get(`${BASE_URL}/materials`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching material prices', error);
  }
};

export const generateQuote = async (projectDetails) => {
  try {
    const token = await getAuthToken();
    const response = await axios.post(`${BASE_URL}/quote`, projectDetails, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error generating quote', error);
  }
};