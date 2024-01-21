import { CREATE_INVOICE, INVOICE_ERROR, GET_INVOICES, GET_INVOICE } from './types';
import axios from 'axios';
import { toast } from 'react-native-toast-message';

export const createInvoice = (invoiceData) => async dispatch => {
  try {
    const res = await axios.post('/create-invoice', invoiceData);
    dispatch({
      type: CREATE_INVOICE,
      payload: res.data
    });
    toast.show({
      type: 'success',
      text1: 'Invoice created successfully!'
    });
  } catch (err) {
    dispatch({
      type: INVOICE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    toast.show({
      type: 'error',
      text1: 'Error creating invoice'
    });
  }
};

export const getInvoices = () => async dispatch => {
  try {
    const res = await axios.get('/invoices');
    dispatch({
      type: GET_INVOICES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: INVOICE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getInvoice = (id) => async dispatch => {
  try {
    const res = await axios.get(`/invoices/${id}`);
    dispatch({
      type: GET_INVOICE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: INVOICE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};