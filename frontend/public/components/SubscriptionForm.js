import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const SubscriptionForm = () => {
  const [subscriptionDetails, setSubscriptionDetails] = useState({
    customerId: '',
    plan: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { jwtToken } = useSelector(state => state.authReducer);

  const handleInputChange = (e) => {
    setSubscriptionDetails({
      ...subscriptionDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/create-subscription', subscriptionDetails, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }
      });
      if (response.data.success) {
        setSuccess('Subscription created successfully!');
        setError('');
      } else {
        setError('Failed to create subscription.');
        setSuccess('');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred.');
      setSuccess('');
    }
  };

  return (
    <div>
      <h2>Create Subscription</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="customerId">Customer ID:</label>
          <input
            type="text"
            id="customerId"
            name="customerId"
            value={subscriptionDetails.customerId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="plan">Plan:</label>
          <select
            id="plan"
            name="plan"
            value={subscriptionDetails.plan}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a plan</option>
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
          </select>
        </div>
        <div>
          <label htmlFor="cardNumber">Card Number:</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={subscriptionDetails.cardNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="expiryDate">Expiry Date:</label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            value={subscriptionDetails.expiryDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cvc">CVC:</label>
          <input
            type="text"
            id="cvc"
            name="cvc"
            value={subscriptionDetails.cvc}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Create Subscription</button>
      </form>
    </div>
  );
};

export default SubscriptionForm;