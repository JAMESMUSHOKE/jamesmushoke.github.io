// This file is called when blockchain confirms the payment
// We verify the transaction and give user the product
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { paymentId, txid } = req.body;
    
    // Log the completed payment
    console.log("Payment COMPLETED on blockchain:", paymentId, "TXID:", txid);
    
    // Here you should:
    // 1. Verify txid with Pi Server
    // 2. Update payment status to "completed" in database
    // 3. Deliver product/service to user
    // Example: await completePayment(paymentId, txid);
    
    // IMPORTANT: Respond 200 OK to Pi
    return res.status(200).json({ success: true, message: "Payment completed" });

  } catch (error) {
    console.error("Complete payment error:", error);
    return res.status(500).json({ error: "Failed to complete payment" });
  }
}
