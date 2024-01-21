import { QUOTE_CALCULATED } from '../utils/quoteUtils';
import axios from 'axios';

export const calculateQuote = (projectDetails) => async (dispatch) => {
  try {
    const response = await axios.post('/quote', projectDetails);
    dispatch({
      type: QUOTE_CALCULATED,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error calculating quote:', error);
    // Handle error by dispatching an error action, if needed
  }
};