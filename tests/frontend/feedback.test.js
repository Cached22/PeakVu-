import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FeedbackForm from '../../src/components/FeedbackForm';
import feedbackApi from '../../src/api/feedbackApi';

jest.mock('../../src/api/feedbackApi');

describe('FeedbackForm Component', () => {
  it('renders the feedback form', () => {
    render(<FeedbackForm />);
    expect(screen.getByTestId('feedbackForm')).toBeInTheDocument();
  });

  it('allows users to submit feedback', async () => {
    feedbackApi.submitFeedback.mockResolvedValue({
      data: { message: 'FEEDBACK_RECEIVED' },
    });

    render(<FeedbackForm />);
    fireEvent.change(screen.getByLabelText(/Your Feedback/i), {
      target: { value: 'Great service!' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(feedbackApi.submitFeedback).toHaveBeenCalledWith({
        feedback: 'Great service!',
      });
    });

    expect(screen.getByText(/Thank you for your feedback!/i)).toBeInTheDocument();
  });

  it('shows an error message if the feedback submission fails', async () => {
    feedbackApi.submitFeedback.mockRejectedValue(new Error('Network Error'));

    render(<FeedbackForm />);
    fireEvent.change(screen.getByLabelText(/Your Feedback/i), {
      target: { value: 'Great service!' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/Failed to submit feedback/i)).toBeInTheDocument();
    });
  });
});