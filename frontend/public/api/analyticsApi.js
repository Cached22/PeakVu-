import axios from 'axios';

const BASE_URL = '/api';

const getAnalyticsData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/analytics`);
    return response.data;
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    throw error;
  }
};

export const analyticsApi = {
  getAnalyticsData,
};