import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { QUOTE_CALCULATED } from '../utils/messageNames';
import { generateQuote } from '../actions/quoteActions';

const QuoteForm = () => {
  const [projectDetails, setProjectDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { jwtToken } = useSelector(state => state.auth);

  const handleInputChange = (event) => {
    setProjectDetails(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/generate-material-list', { projectDetails }, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }
      });

      if (response.data) {
        dispatch(generateQuote(response.data));
        alert(QUOTE_CALCULATED);
      }
    } catch (error) {
      console.error('Error generating quote:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Generate Quote</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={projectDetails}
          onChange={handleInputChange}
          placeholder="Enter project details to generate materials list"
          rows="5"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Quote'}
        </button>
      </form>
    </div>
  );
};

export default QuoteForm;