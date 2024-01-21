import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SubscriptionForm from '../../src/components/SubscriptionForm';
import { createSubscription } from '../../src/actions/subscriptionActions';
import { Provider } from 'react-redux';
import configureStore from '../../src/store/store';

jest.mock('../../src/actions/subscriptionActions');

describe('SubscriptionForm', () => {
  let store;

  beforeEach(() => {
    store = configureStore();
  });

  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <SubscriptionForm />
      </Provider>
    );

    expect(screen.getByLabelText(/customer id/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/plan id/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('allows submitting a new subscription', async () => {
    createSubscription.mockImplementation(() => ({ type: 'SUBSCRIPTION_STARTED' }));
    render(
      <Provider store={store}>
        <SubscriptionForm />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/customer id/i), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText(/plan id/i), { target: { value: 'basic-plan' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(createSubscription).toHaveBeenCalledWith({
        customerId: '12345',
        planId: 'basic-plan',
      });
    });
  });

  it('displays a confirmation message after successful subscription', async () => {
    createSubscription.mockResolvedValue({ type: 'SUBSCRIPTION_STARTED', payload: { message: 'Subscription started successfully' } });
    render(
      <Provider store={store}>
        <SubscriptionForm />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/customer id/i), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText(/plan id/i), { target: { value: 'basic-plan' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/subscription started successfully/i)).toBeInTheDocument();
    });
  });

  it('shows an error message if subscription fails', async () => {
    createSubscription.mockRejectedValue({ message: 'Subscription failed' });
    render(
      <Provider store={store}>
        <SubscriptionForm />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/customer id/i), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText(/plan id/i), { target: { value: 'basic-plan' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/subscription failed/i)).toBeInTheDocument();
    });
  });
});