// Initialize Pi SDK when page loads
window.addEventListener('load', function() {
    Pi.init({ version: "2.0", sandbox: true });
});

let currentUser = null;

function signIn() {
    document.getElementById('status').innerText = "Please approve in Pi Browser...";
    
    const scopes = ['username', 'payments'];
    
    Pi.authenticate(scopes, onIncompletePaymentFound)
    .then(function(auth) {
        currentUser = auth.user;
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('marketplace-section').style.display = 'block';
        document.getElementById('user-info').innerText = "Welcome, " + currentUser.username + "!";
        document.getElementById('status').innerText = "Login successful!";
    }).catch(function(error) {
        console.error(error);
        document.getElementById('status').innerText = "Error: " + error;
    });
}

function makePayment() {
    document.getElementById('status').innerText = "Creating payment...";
    
    const paymentData = {
        amount: 0.001,
        memo: "Test Payment for SHALOM",
        metadata: { app: "SHALOM", type: "test" }
    };

    Pi.createPayment(paymentData, {
        onReadyForServerApproval: function(paymentId) {
            document.getElementById('status').innerText = "Waiting for approval... Payment ID: " + paymentId;
        },
        onReadyForServerCompletion: function(paymentId, txid) {
            document.getElementById('status').innerText = "Payment completed! Transaction: " + txid;
        },
        onCancel: function(paymentId) {
            document.getElementById('status').innerText = "Payment cancelled";
        },
        onError: function(error) {
            console.error(error);
            document.getElementById('status').innerText = "Error: " + error;
        }
    });
}

// Required for Pi - handles incomplete payments
function onIncompletePaymentFound(payment) {
    console.log("Found incomplete payment:", payment);
}
