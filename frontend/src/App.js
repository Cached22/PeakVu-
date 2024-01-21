import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';
import UploadForm from './components/UploadForm';
import QuoteForm from './components/QuoteForm';
import InvoiceForm from './components/InvoiceForm';
import ProposalForm from './components/ProposalForm';
import PaymentForm from './components/PaymentForm';
import SubscriptionForm from './components/SubscriptionForm';
import FeedbackForm from './components/FeedbackForm';
import Analytics from './components/Analytics';
import PrivateRoute from './utils/authUtils';
import './styles/main.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Dashboard} />
        <PrivateRoute path="/projects" component={ProjectList} />
        <PrivateRoute path="/project/:id" component={ProjectDetail} />
        <PrivateRoute path="/upload" component={UploadForm} />
        <PrivateRoute path="/quote" component={QuoteForm} />
        <PrivateRoute path="/invoice" component={InvoiceForm} />
        <PrivateRoute path="/proposal" component={ProposalForm} />
        <PrivateRoute path="/payment" component={PaymentForm} />
        <PrivateRoute path="/subscription" component={SubscriptionForm} />
        <PrivateRoute path="/feedback" component={FeedbackForm} />
        <PrivateRoute path="/analytics" component={Analytics} />
        <Route path="*" component={() => "404 Not Found"} />
      </Switch>
    </Router>
  );
}

export default App;