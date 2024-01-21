import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StripeProvider } from '@stripe/stripe-react-native';

import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import ProjectListScreen from './src/screens/ProjectListScreen';
import ProjectDetailScreen from './src/screens/ProjectDetailScreen';
import UploadScreen from './src/screens/UploadScreen';
import QuoteScreen from './src/screens/QuoteScreen';
import InvoiceScreen from './src/screens/InvoiceScreen';
import ProposalScreen from './src/screens/ProposalScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import SubscriptionScreen from './src/screens/SubscriptionScreen';
import FeedbackScreen from './src/screens/FeedbackScreen';
import { stripeSecretKey } from './src/utils/stripeUtils'; // Assume this utility file contains the secret key

const Stack = createStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      if (token) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error fetching token', error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <StripeProvider publishableKey={stripeSecretKey}>
      <NavigationContainer>
        <Stack.Navigator>
          {!isAuthenticated ? (
            <Stack.Screen name="Login" component={LoginScreen} />
          ) : (
            <>
              <Stack.Screen name="Dashboard" component={DashboardScreen} />
              <Stack.Screen name="ProjectList" component={ProjectListScreen} />
              <Stack.Screen name="ProjectDetail" component={ProjectDetailScreen} />
              <Stack.Screen name="Upload" component={UploadScreen} />
              <Stack.Screen name="Quote" component={QuoteScreen} />
              <Stack.Screen name="Invoice" component={InvoiceScreen} />
              <Stack.Screen name="Proposal" component={ProposalScreen} />
              <Stack.Screen name="Payment" component={PaymentScreen} />
              <Stack.Screen name="Subscription" component={SubscriptionScreen} />
              <Stack.Screen name="Feedback" component={FeedbackScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
};

export default App;