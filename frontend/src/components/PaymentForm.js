import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const PaymentForm = ({ amount, onSuccessfulPayment }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { data: clientSecret } = await axios.post('/create-payment-intent', {
        amount: amount,
      });

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            // Include any billing details here.
          },
        },
      });

      if (paymentResult.error) {
        setError(`Payment failed: ${paymentResult.error.message}`);
        setLoading(false);
      } else {
        if (paymentResult.paymentIntent.status === 'succeeded') {
          onSuccessfulPayment(paymentResult.paymentIntent);
          setLoading(false);
        }
      }
    } catch (error) {
      setError(`Payment failed: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={loading || !stripe}>
        {loading ? 'Processing...' : `Pay $${amount}`}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default PaymentForm;