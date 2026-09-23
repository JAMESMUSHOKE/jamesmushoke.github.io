// This file is called when user approves payment in Pi Wallet
// We must respond with 200 OK within 15 seconds or payment expires
export default async function handler(req, res) {
  
  // CRITICAL: Allow Pi servers to call this API
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { paymentId } = req.body;
    
    // Log the approved payment - Like Core Team logs transactions
    console.log("Payment APPROVED by user:", paymentId);
    
    // TODO: Save paymentId to database with status "pending"
    // Example: await savePayment(paymentId, "pending");
    
    // CRITICAL: Respond 200 OK IMMEDIATELY to Pi so it doesn't timeout
    return res.status(200).json({ 
      success: true, 
      message: "Payment approved",
      paymentId: paymentId 
    });

  } catch (error) {
    console.error("Approve payment error:", error);
    return res.status(500).json({ error: "Failed to approve payment" });
  }
}
