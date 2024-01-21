import axios from 'axios';
import { stripeSecretKey } from '../shared/dependencies';

// Utility function to format invoice data before sending to backend
export const formatInvoiceData = (projectDetails, customerDetails, invoiceItems) => {
  return {
    project: projectDetails.id,
    customer: {
      name: customerDetails.name,
      email: customerDetails.email,
      address: customerDetails.address,
    },
    items: invoiceItems.map(item => ({
      description: item.description,
      quantity: item.quantity,
      price: item.price,
    })),
    dueDate: new Date().setDate(new Date().getDate() + 30), // Due in 30 days from now
  };
};

// Function to create an invoice using the backend API
export const createInvoice = async (invoiceData) => {
  try {
    const response = await axios.post('/create-invoice', invoiceData);
    return response.data;
  } catch (error) {
    console.error('Error creating invoice:', error);
    throw error;
  }
};

// Function to initiate a payment process using Stripe
export const initiatePayment = async (invoiceId, token) => {
  try {
    const response = await axios.post('/create-payment-intent', {
      invoiceId,
      token,
      apiKey: stripeSecretKey,
    });
    return response.data;
  } catch (error) {
    console.error('Error initiating payment:', error);
    throw error;
  }
};

// Function to check the status of a payment
export const checkPaymentStatus = async (paymentId) => {
  try {
    const response = await axios.get(`/payment-status/${paymentId}`);
    return response.data;
  } catch (error) {
    console.error('Error checking payment status:', error);
    throw error;
  }
};