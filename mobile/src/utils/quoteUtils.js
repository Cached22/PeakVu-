import { quoteApi } from '../api/quoteApi';

const calculateQuote = async (projectDetails) => {
  try {
    const response = await quoteApi.post('/quote', projectDetails);
    return response.data;
  } catch (error) {
    console.error('Error calculating quote:', error);
    throw error;
  }
};

const fetchMaterialPrices = async () => {
  try {
    const response = await quoteApi.get('/materials');
    return response.data;
  } catch (error) {
    console.error('Error fetching material prices:', error);
    throw error;
  }
};

export const quoteUtils = {
  calculateQuote,
  fetchMaterialPrices
};