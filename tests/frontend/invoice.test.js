import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InvoiceForm from '../../src/components/InvoiceForm';
import { createInvoice } from '../../src/actions/invoiceActions';
import { Provider } from 'react-redux';
import configureStore from '../../src/store/store';

jest.mock('../../src/actions/invoiceActions');

describe('InvoiceForm Component', () => {
  let store;

  beforeEach(() => {
    store = configureStore();
  });

  it('renders InvoiceForm component', () => {
    render(
      <Provider store={store}>
        <InvoiceForm />
      </Provider>
    );

    expect(screen.getByTestId('invoiceForm')).toBeInTheDocument();
  });

  it('allows users to create an invoice', async () => {
    createInvoice.mockImplementation(() => ({ type: 'INVOICE_GENERATED' }));

    render(
      <Provider store={store}>
        <InvoiceForm />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/customer name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/project id/i), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText(/total amount/i), { target: { value: '5000' } });
    fireEvent.click(screen.getByRole('button', { name: /submit invoice/i }));

    await waitFor(() => {
      expect(createInvoice).toHaveBeenCalledWith({
        customerName: 'John Doe',
        projectId: '12345',
        totalAmount: '5000'
      });
    });
  });

  it('displays a success message after creating an invoice', async () => {
    createInvoice.mockResolvedValueOnce({ type: 'INVOICE_GENERATED', payload: { message: 'Invoice successfully generated!' } });

    render(
      <Provider store={store}>
        <InvoiceForm />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /submit invoice/i }));

    await waitFor(() => {
      expect(screen.getByText(/invoice successfully generated!/i)).toBeInTheDocument();
    });
  });

  it('displays an error message if invoice creation fails', async () => {
    createInvoice.mockRejectedValueOnce(new Error('Failed to generate invoice'));

    render(
      <Provider store={store}>
        <InvoiceForm />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /submit invoice/i }));

    await waitFor(() => {
      expect(screen.getByText(/failed to generate invoice/i)).toBeInTheDocument();
    });
  });
});