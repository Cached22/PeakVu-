import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import QuoteForm from '../components/QuoteForm';
import { quoteReducer } from '../reducers/quoteReducer';
import { QUOTE_CALCULATED } from '../utils/quoteUtils';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
const store = mockStore({
  quote: {
    loading: false,
    quoteData: null,
    error: null,
  },
});

describe('QuoteForm Component', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <QuoteForm />
      </Provider>
    );
  });

  it('renders correctly', () => {
    expect(screen.getByTestId('quote-form')).toBeInTheDocument();
  });

  it('allows entering project details', () => {
    fireEvent.change(screen.getByLabelText(/Project Size/i), {
      target: { value: '500' },
    });
    fireEvent.change(screen.getByLabelText(/Material Type/i), {
      target: { value: 'Shingles' },
    });
    expect(screen.getByLabelText(/Project Size/i).value).toBe('500');
    expect(screen.getByLabelText(/Material Type/i).value).toBe('Shingles');
  });

  it('dispatches the quote calculation action', async () => {
    fireEvent.click(screen.getByRole('button', { name: /calculate quote/i }));
    const actions = store.getActions();
    await waitFor(() => expect(actions).toContainEqual({ type: QUOTE_CALCULATED }));
  });

  it('displays the calculated quote', async () => {
    store.dispatch({
      type: QUOTE_CALCULATED,
      payload: { total: 15000 },
    });
    await waitFor(() => expect(screen.getByTestId('calculated-quote')).toHaveTextContent('15000'));
  });
});

describe('quoteReducer', () => {
  it('returns the initial state', () => {
    expect(quoteReducer(undefined, {})).toEqual({
      loading: false,
      quoteData: null,
      error: null,
    });
  });

  it('handles QUOTE_CALCULATED', () => {
    expect(
      quoteReducer(undefined, {
        type: QUOTE_CALCULATED,
        payload: { total: 15000 },
      })
    ).toEqual({
      loading: false,
      quoteData: { total: 15000 },
      error: null,
    });
  });
});