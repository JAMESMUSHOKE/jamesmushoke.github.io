export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: "Method not allowed" });
  
  const { paymentId, userAccessToken } = req.body;
  const API_KEY = process.env.PI_API_KEY;

  try {
    // 1. Verify User
    const userRes = await fetch('https://api.minepi.com/v2/me', {
      headers: { 'Authorization': `Bearer ${userAccessToken}` }
    });

    // 2. APPROVE PAYMENT
    await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: 'POST',
      headers: { 'Authorization': `Key ${API_KEY}` }
    });

    res.status(200).json({ status: "approved" });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
