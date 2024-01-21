const stripe = require('stripe')(stripeSecretKey);

const createPaymentIntent = async (amount, currency = 'usd') => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card'],
    });
    return paymentIntent;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

const retrievePaymentIntent = async (paymentIntentId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent;
  } catch (error) {
    console.error('Error retrieving payment intent:', error);
    throw error;
  }
};

const createSubscription = async (customerId, priceId) => {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });
    return subscription;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
};

const cancelSubscription = async (subscriptionId) => {
  try {
    const canceledSubscription = await stripe.subscriptions.del(subscriptionId);
    return canceledSubscription;
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw error;
  }
};

const getSubscriptionDetails = async (subscriptionId) => {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    return subscription;
  } catch (error) {
    console.error('Error retrieving subscription details:', error);
    throw error;
  }
};

module.exports = {
  createPaymentIntent,
  retrievePaymentIntent,
  createSubscription,
  cancelSubscription,
  getSubscriptionDetails,
};