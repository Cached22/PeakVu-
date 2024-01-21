import axios from 'axios';

const getMaterialPrices = async () => {
  try {
    const response = await axios.get('/materials');
    return response.data;
  } catch (error) {
    console.error('Error fetching material prices:', error);
    throw error;
  }
};

const calculateQuote = async (projectDetails) => {
  try {
    const materialPrices = await getMaterialPrices();
    const response = await axios.post('/quote', { projectDetails, materialPrices });
    return response.data;
  } catch (error) {
    console.error('Error generating quote:', error);
    throw error;
  }
};

export const quoteUtils = {
  getMaterialPrices,
  calculateQuote,
};