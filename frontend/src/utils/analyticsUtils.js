import axios from 'axios';

const BASE_URL = '/api';

export const fetchAnalyticsData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/analytics`);
    return response.data;
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    throw error;
  }
};

export const getMostUsedMaterials = async () => {
  try {
    const analyticsData = await fetchAnalyticsData();
    return analyticsData.mostUsedMaterials;
  } catch (error) {
    console.error('Error getting most used materials:', error);
    throw error;
  }
};

export const getAverageProjectCosts = async () => {
  try {
    const analyticsData = await fetchAnalyticsData();
    return analyticsData.averageProjectCosts;
  } catch (error) {
    console.error('Error getting average project costs:', error);
    throw error;
  }
};

export const getCustomerFeedbackStats = async () => {
  try {
    const analyticsData = await fetchAnalyticsData();
    return analyticsData.customerFeedbackStats;
  } catch (error) {
    console.error('Error getting customer feedback stats:', error);
    throw error;
  }
};