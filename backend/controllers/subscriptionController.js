const stripe = require('stripe')(stripeSecretKey);
const Subscription = require('../models/Subscription');
const User = require('../models/User');

const createSubscription = async (req, res) => {
  try {
    const { userId, paymentMethodId, plan } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new subscription
    const subscription = await stripe.subscriptions.create({
      customer: user.stripeCustomerId,
      items: [{ plan }],
      default_payment_method: paymentMethodId,
    });

    // Save subscription details to the database
    const newSubscription = new Subscription({
      userId,
      stripeSubscriptionId: subscription.id,
      plan: subscription.items.data[0].plan.id,
      status: subscription.status,
    });

    await newSubscription.save();

    res.status(201).json(newSubscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSubscriptions = async (req, res) => {
  try {
    const { userId } = req.params;
    const subscriptions = await Subscription.find({ userId });

    if (!subscriptions) {
      return res.status(404).json({ message: 'No subscriptions found for this user' });
    }

    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const cancelSubscription = async (req, res) => {
  try {
    const { subscriptionId } = req.params;
    const subscription = await Subscription.findById(subscriptionId);

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    // Cancel the subscription on Stripe
    const canceledSubscription = await stripe.subscriptions.del(subscription.stripeSubscriptionId);

    // Update subscription status in the database
    subscription.status = 'canceled';
    await subscription.save();

    res.status(200).json({ message: 'Subscription canceled successfully', subscription });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSubscription,
  getSubscriptions,
  cancelSubscription
};