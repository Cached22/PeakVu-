import { stripeSecretKey } from '../config/keys';
import axios from 'axios';
import { Alert } from 'react-native';

const stripe = require('stripe')(stripeSecretKey);

const createInvoice = async (customerId, amount, description) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      customer: customerId,
      description,
      payment_method_types: ['card'],
    });
    return paymentIntent;
  } catch (error) {
    console.error('Error creating invoice:', error);
    Alert.alert('Error', 'Unable to create invoice. Please try again later.');
  }
};

const retrieveInvoice = async (invoiceId) => {
  try {
    const invoice = await stripe.invoices.retrieve(invoiceId);
    return invoice;
  } catch (error) {
    console.error('Error retrieving invoice:', error);
    Alert.alert('Error', 'Unable to retrieve invoice. Please try again later.');
  }
};

const payInvoice = async (invoiceId) => {
  try {
    const invoice = await stripe.invoices.pay(invoiceId);
    return invoice;
  } catch (error) {
    console.error('Error paying invoice:', error);
    Alert.alert('Error', 'Unable to pay invoice. Please try again later.');
  }
};

const sendInvoiceToServer = async (invoiceData) => {
  try {
    const response = await axios.post('/create-invoice', invoiceData);
    return response.data;
  } catch (error) {
    console.error('Error sending invoice to server:', error);
    Alert.alert('Error', 'Unable to send invoice to server. Please try again later.');
  }
};

export {
  createInvoice,
  retrieveInvoice,
  payInvoice,
  sendInvoiceToServer
};