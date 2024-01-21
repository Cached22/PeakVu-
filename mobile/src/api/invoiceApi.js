import axios from 'axios';
import { stripeSecretKey } from '../utils/stripeHelper';

const BASE_URL = 'http://api.peakvuroofing.com';

const createInvoice = async (invoiceData, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/create-invoice`, invoiceData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating invoice:', error);
    throw error;
  }
};

const getInvoice = async (invoiceId, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/invoices/${invoiceId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching invoice:', error);
    throw error;
  }
};

const payInvoice = async (invoiceId, paymentMethodId, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/create-payment-intent`,
      {
        invoiceId,
        paymentMethodId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Stripe-Account': stripeSecretKey,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error paying invoice:', error);
    throw error;
  }
};

export const invoiceApi = {
  createInvoice,
  getInvoice,
  payInvoice,
};