// This file is called when user approves payment in Pi Wallet
// We must respond with 200 OK within 15 seconds or payment expires
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { paymentId } = req.body;
    
    // Log the approved payment
    console.log("Payment APPROVED by user:", paymentId);
    
    // Here you should save paymentId to your database with status "pending"
    // Example: await savePayment(paymentId, "pending");
    
    // IMPORTANT: Respond 200 OK to Pi so it doesn't timeout
    return res.status(200).json({ success: true, message: "Payment approved" });

  } catch (error) {
    console.error("Approve payment error:", error);
    return res.status(500).json({ error: "Failed to approve payment" });
  }
}
