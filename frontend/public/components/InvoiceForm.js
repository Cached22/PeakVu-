import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const InvoiceForm = () => {
  const [invoiceData, setInvoiceData] = useState({
    projectId: '',
    description: '',
    amount: '',
    dueDate: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const { auth } = useSelector((state) => state.authReducer);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await axios.post('/create-invoice', invoiceData, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      alert('Invoice created successfully!');
      setInvoiceData({
        projectId: '',
        description: '',
        amount: '',
        dueDate: ''
      });
    } catch (err) {
      setError(err.response ? err.response.data : 'Could not create invoice');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Create Invoice</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="projectId">Project ID:</label>
          <input
            type="text"
            id="projectId"
            name="projectId"
            value={invoiceData.projectId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={invoiceData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Amount ($):</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={invoiceData.amount}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={invoiceData.dueDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Creating...' : 'Create Invoice'}
        </button>
      </form>
    </div>
  );
};

export default InvoiceForm;