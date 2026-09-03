<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SHALOM PAY</title>
  <script src="https://sdk.minepi.com/pi-sdk.js"></script>
  <style>
    body { background: linear-gradient(135deg, #0f2027, #203a43, #2c5364); color: white; font-family: Arial; text-align: center; padding: 30px; }
    .btn { padding: 15px 25px; background: #00d4ff; color: black; border: none; border-radius: 10px; font-size: 16px; font-weight: bold; cursor: pointer; }
    .back { display: block; margin-top: 30px; color: #00d4ff; text-decoration: none; }
  </style>
</head>
<body>
  <h1>💰 SHALOM PAY</h1>
  <p>Secure Web3 payments powered by Pi Network Blockchain</p>
  <button class="btn" onclick="payWithPi(1, 'Demo Product Payment')">Pay 1 Pi for Demo Product</button>
  <a href="index.html" class="back">← Back to Home</a>

  <script>
    Pi.init({ version: "2.0", sandbox: "true" });
    function payWithPi(amount, memo) {
      Pi.createPayment({ amount: amount, memo: memo, metadata: { app: "SHALOM" }}, {
        onReadyForServerApproval: (paymentId) => alert("Approved: " + paymentId),
        onReadyForServerCompletion: (paymentId, txid) => alert("Completed! Tx: " + txid),
        onCancel: () => alert("Cancelled"),
        onError: (error) => alert("Error: " + error)
      });
    }
  </script>
</body>
</html>
