// SHALOM APP.JS - Web3, AI, Pi Integration + Cash In

Pi.init({ version: "2.0", sandbox: false });

function signIn() {
  Pi.authenticate(['username', 'payments'], onIncompletePaymentFound)
    .then(auth => {
      alert("Welcome " + auth.user.username + " to SHALOM Web3 Marketplace!");
    })
    .catch(error => console.error(error));
}

function payWithPi() {
  const paymentData = {
    amount: 1,
    memo: "SHALOM Demo Product",
    metadata: { productId: "demo123" }
  };
  createPiPayment(paymentData);
}

// CASH IN FUNCTION
function cashIn() {
  let amount = document.getElementById('piAmount').value;
  if(amount <= 0 || amount == "") {
    alert("Please enter a valid Pi amount");
    return;
  }

  const paymentData = {
    amount: parseFloat(amount),
    memo: "SHALOM Wallet Deposit",
    metadata: { type: "cash_in" }
  };
  createPiPayment(paymentData);
}

function buyProduct(name, price) {
  alert("Buying " + name + " for " + price + " Pi");
  const paymentData = {
    amount: parseFloat(price),
    memo: "Buy: " + name,
    metadata: { productId: name }
  };
  createPiPayment(paymentData);
}

// SHARED PAYMENT HANDLER
function createPiPayment(paymentData) {
  Pi.createPayment(paymentData, {
    onReadyForServerApproval,
    onReadyForServerCompletion,
    onCancel,
    onError
  });
}

function onIncompletePaymentFound(payment) { console.log("Incomplete:", payment); }
function onReadyForServerApproval(paymentId) { console.log("Approve:", paymentId); }
function onReadyForServerCompletion(paymentId, txid) { alert("Payment Complete! TX: " + txid); }
function onCancel(paymentId) { alert("Payment Cancelled"); }
function onError(error) { alert("Payment Error: " + error); }
