import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { createPaymentIntent } from '../api/paymentApi';

const PaymentScreen = ({ navigation, route }) => {
  const { amount, projectId } = route.params;
  const [email, setEmail] = useState('');
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment } = useStripe();

  const handlePayment = async () => {
    if (!cardDetails?.complete || !email) {
      Alert.alert('Please enter Complete card details and Email');
      return;
    }
    try {
      const paymentIntent = await createPaymentIntent(amount, email);
      const { clientSecret } = paymentIntent.data;

      const { paymentIntent: paymentIntentResult, error } = await confirmPayment(clientSecret, {
        type: 'Card',
        billingDetails: { email },
      });

      if (error) {
        Alert.alert(`Payment failed: ${error.message}`);
      } else if (paymentIntentResult) {
        Alert.alert('Payment successful', `Payment for project ${projectId} was successful!`);
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert('Payment failed', 'Unable to process payment at this time.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Complete your payment</Text>
      <TextInput
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        style={styles.input}
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
      <Button onPress={handlePayment} title="Pay Now" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
  },
  cardContainer: {
    height: 50,
    width: '100%',
    marginVertical: 30,
  },
});

export default PaymentScreen;