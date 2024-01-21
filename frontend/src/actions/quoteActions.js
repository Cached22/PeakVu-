import axios from 'axios';
import { QUOTE_CALCULATED } from '../utils/messageNames';

export const calculateQuote = (projectDetails) => async (dispatch) => {
  try {
    const response = await axios.post('/quote', projectDetails);
    dispatch({
      type: QUOTE_CALCULATED,
      payload: response.data,
    });
  } catch (error) {
    // Handle the error here. For example, you can dispatch an error action or update state with error information
    console.error('Error calculating quote:', error);
  }
};