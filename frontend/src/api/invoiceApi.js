import axios from 'axios';

const API_URL = '/api';

// Create an invoice
export const createInvoice = async (invoiceData) => {
  try {
    const response = await axios.post(`${API_URL}/create-invoice`, invoiceData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Fetch all invoices for a user
export const fetchInvoices = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/invoices/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Fetch a single invoice by ID
export const fetchInvoiceById = async (invoiceId) => {
  try {
    const response = await axios.get(`${API_URL}/invoice/${invoiceId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update an invoice
export const updateInvoice = async (invoiceId, updateData) => {
  try {
    const response = await axios.put(`${API_URL}/invoice/${invoiceId}`, updateData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete an invoice
export const deleteInvoice = async (invoiceId) => {
  try {
    const response = await axios.delete(`${API_URL}/invoice/${invoiceId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};