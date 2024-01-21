import axios from 'axios';

const API_URL = '/api';

export const fetchMaterialPrices = async () => {
  try {
    const response = await axios.get(`${API_URL}/materials`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const generateQuote = async (projectDetails) => {
  try {
    const response = await axios.post(`${API_URL}/quote`, projectDetails);
    return response.data;
  } catch (error) {
    throw error;
  }
};