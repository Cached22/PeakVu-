import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/authReducer';
import projectReducer from '../reducers/projectReducer';
import invoiceReducer from '../reducers/invoiceReducer';
import quoteReducer from '../reducers/quoteReducer';
import feedbackReducer from '../reducers/feedbackReducer';
import subscriptionReducer from '../reducers/subscriptionReducer';
import analyticsReducer from '../reducers/analyticsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  invoice: invoiceReducer,
  quote: quoteReducer,
  feedback: feedbackReducer,
  subscription: subscriptionReducer,
  analytics: analyticsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;