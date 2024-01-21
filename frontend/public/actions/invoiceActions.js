import axios from 'axios';
import {
  INVOICE_GENERATED,
  CREATE_INVOICE_ERROR
} from './types';

// Action to create an invoice
export const createInvoice = (invoiceData) => async dispatch => {
  try {
    const res = await axios.post('/create-invoice', invoiceData);
    dispatch({
      type: INVOICE_GENERATED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CREATE_INVOICE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Action to fetch an invoice by ID
export const fetchInvoiceById = (invoiceId) => async dispatch => {
  try {
    const res = await axios.get(`/invoices/${invoiceId}`);
    dispatch({
      type: INVOICE_GENERATED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CREATE_INVOICE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};