// This file creates a payment request and sends it to Pi Wallet
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, memo, metadata } = req.body;

    // Create a new payment object for Pi Network
    const payment = {
      amount: amount || 0.01, // Default 0.01 Pi for testing
      memo: memo || "Test payment for Shalom App",
      metadata: metadata || { product: "test" }
    };

    console.log("Payment created:", payment);
    
    // Return payment data to frontend
    return res.status(200).json(payment);

  } catch (error) {
    console.error("Create payment error:", error);
    return res.status(500).json({ error: "Failed to create payment" });
  }
}
