export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: "Method not allowed" });
  
  const { paymentId, txid } = req.body;
  const API_KEY = process.env.PI_API_KEY;

  try {
    // COMPLETE PAYMENT
    await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
      method: 'POST',
      headers: { 
        'Authorization': `Key ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ txid })
    });

    res.status(200).json({ status: "completed" });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
