import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const submitFeedback = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await axios.post('/feedback', { feedback });
      setMessage(response.data.message);
      setFeedback('');
    } catch (error) {
      setMessage('An error occurred while sending feedback.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={submitFeedback}>
        <h2>Customer Feedback</h2>
        <textarea
          id="feedbackForm"
          value={feedback}
          onChange={handleFeedbackChange}
          placeholder="Share your experience with us"
          required
        />
        <button type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FeedbackForm;