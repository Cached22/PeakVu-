import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { startSubscription } from '../actions/subscriptionActions';
import { stripeSecretKey } from '../utils/subscriptionUtils';
import { StripeProvider, CardField, useStripe } from '@stripe/stripe-react-native';

const SubscriptionScreen = () => {
  const [email, setEmail] = useState('');
  const [cardDetails, setCardDetails] = useState();
  const dispatch = useDispatch();
  const stripe = useStripe();

  const handleSubscribe = async () => {
    if (!cardDetails?.complete || !email) {
      Alert.alert('Please enter complete card details and email');
      return;
    }

    // Create a Payment Method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'Card',
      card: cardDetails,
    });

    if (error) {
      Alert.alert(`Error: ${error.message}`);
    } else {
      // Dispatch the startSubscription action with the payment method ID
      dispatch(startSubscription(email, paymentMethod.id));
    }
  };

  useEffect(() => {
    // Initialize Stripe
    stripe.initPaymentSheet({ merchantIdentifier: 'merchant.com.peakvuroofing', customerId: email });
  }, [email]);

  return (
    <StripeProvider publishableKey={stripeSecretKey}>
      <View style={styles.container}>
        <Text style={styles.title}>Monthly Subscription</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <CardField
          postalCodeEnabled={false}
          placeholder={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={styles.card}
          style={styles.cardContainer}
          onCardChange={(cardDetails) => setCardDetails(cardDetails)}
        />
        <Button title="Subscribe" onPress={handleSubscribe} />
      </View>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    padding: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});

export default SubscriptionScreen;