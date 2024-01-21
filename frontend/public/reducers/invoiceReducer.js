import {
  CREATE_INVOICE_REQUEST,
  CREATE_INVOICE_SUCCESS,
  CREATE_INVOICE_FAILURE,
  FETCH_INVOICES_REQUEST,
  FETCH_INVOICES_SUCCESS,
  FETCH_INVOICES_FAILURE,
  UPDATE_INVOICE_REQUEST,
  UPDATE_INVOICE_SUCCESS,
  UPDATE_INVOICE_FAILURE,
  DELETE_INVOICE_REQUEST,
  DELETE_INVOICE_SUCCESS,
  DELETE_INVOICE_FAILURE
} from '../actions/invoiceActions';

const initialState = {
  invoices: [],
  loading: false,
  error: null
};

function invoiceReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_INVOICE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case CREATE_INVOICE_SUCCESS:
      return {
        ...state,
        loading: false,
        invoices: [...state.invoices, action.payload]
      };
    case CREATE_INVOICE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case FETCH_INVOICES_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_INVOICES_SUCCESS:
      return {
        ...state,
        loading: false,
        invoices: action.payload
      };
    case FETCH_INVOICES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case UPDATE_INVOICE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case UPDATE_INVOICE_SUCCESS:
      return {
        ...state,
        loading: false,
        invoices: state.invoices.map(invoice =>
          invoice._id === action.payload._id ? action.payload : invoice
        )
      };
    case UPDATE_INVOICE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case DELETE_INVOICE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case DELETE_INVOICE_SUCCESS:
      return {
        ...state,
        loading: false,
        invoices: state.invoices.filter(invoice => invoice._id !== action.payload)
      };
    case DELETE_INVOICE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}

export default invoiceReducer;