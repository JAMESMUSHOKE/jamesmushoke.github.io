import { PiPayments } from '@pinetwork-js/sdk';

const PI_API_KEY = process.env.PI_API_KEY;
const piPayments = new PiPayments(PI_API_KEY);

export default async function handler(req, res) {
  // Allow only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { action, paymentId, txid } = req.body;

  try {
    // 1. APPROVE THE PAYMENT
    if (action === 'approve') {
      await piPayments.approvePayment(paymentId);
      return res.status(200).json({ status: 'approved' });
    }

    // 2. COMPLETE THE PAYMENT
    if (action === 'complete') {
      await piPayments.completePayment(paymentId, txid);
      return res.status(200).json({ status: 'completed' });
    }

    // 3. CANCEL THE PAYMENT
    if (action === 'cancel') {
      await piPayments.cancelPayment(paymentId);
      return res.status(200).json({ status: 'canceled' });
    }

    return res.status(400).json({ error: 'Invalid action' });

  } catch (error) {
    console.error('Pi Payment Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
