const Stripe = require("stripe");
const stripe = Stripe("your-secret-key"); // Replace with your Stripe secret key

exports.createPaymentIntent = async (req, res) => {
  const { amount } = req.body; // Amount in cents

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd", // Change to your currency
      payment_method_types: ["card"],
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
