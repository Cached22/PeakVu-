import { INVOICE_GENERATED, FETCH_INVOICES, UPDATE_INVOICE, DELETE_INVOICE } from '../actions/types';

const initialState = {
  invoices: [],
  loading: true,
  error: null
};

export default function invoiceReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_INVOICES:
      return {
        ...state,
        invoices: action.payload,
        loading: false
      };
    case INVOICE_GENERATED:
      return {
        ...state,
        invoices: [action.payload, ...state.invoices],
        loading: false
      };
    case UPDATE_INVOICE:
      return {
        ...state,
        invoices: state.invoices.map(invoice =>
          invoice._id === action.payload._id ? action.payload : invoice
        ),
        loading: false
      };
    case DELETE_INVOICE:
      return {
        ...state,
        invoices: state.invoices.filter(invoice => invoice._id !== action.payload),
        loading: false
      };
    default:
      return state;
  }
}