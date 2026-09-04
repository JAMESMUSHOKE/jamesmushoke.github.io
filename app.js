// CONFIG - Replace with your backend URL later
const BACKEND_URL = "https://your-backend.com"; // For now we will simulate

// SCOPES REQUIRED
const scopes = ['username', 'payments'];

// Handle incomplete payments when user reopens app
function onIncompletePaymentFound(payment) {
    document.getElementById('status').innerText = "Found incomplete payment. Completing...";
    completePaymentOnBackend(payment.identifier);
};

// INITIALIZE PI SDK
Pi.init({ version: "2.0", sandbox: true }); // sandbox:true for Testnet. Change to false for Mainnet

// 1. LOGIN FUNCTION
async function signIn() {
    try {
        document.getElementById('status').innerText = "Logging in...";
        const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);
        
        document.getElementById('user-info').innerText = `Welcome, ${auth.user.username}!`;
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('marketplace-section').style.display = 'block';
        document.getElementById('status').innerText = "Login successful!";
        
    } catch (error) {
        document.getElementById('status').innerText = `Login failed: ${error}`;
        console.error(error);
    }
}

// 2. PAYMENT FUNCTION
async function makePayment() {
    const paymentData = {
        amount: 0.001,
        memo: "Test payment for SHALOM product",
        metadata: { productId: "test_001", page: "index" }
    };

    const callbacks = {
        // STEP 1: Pi asks your server to approve the payment
        onReadyForServerApproval: function(paymentId) {
            document.getElementById('status').innerText = "Approving payment on server...";
            approvePaymentOnBackend(paymentId);
        },

        // STEP 2: After user signs in wallet, Pi asks your server to complete
        onReadyForServerCompletion: function(paymentId, txid) {
            document.getElementById('status').innerText = "Completing payment on server...";
            completePaymentOnBackend(paymentId, txid);
        },

        onCancel: function(paymentId) {
            document.getElementById('status').innerText = "Payment cancelled.";
        },

        onError: function(error, payment) {
            document.getElementById('status').innerText = "Payment error: " + error;
            console.error(error);
        }
    };
    
    Pi.createPayment(paymentData, callbacks);
}

// 3. FUNCTION TO APPROVE PAYMENT ON BACKEND
async function approvePaymentOnBackend(paymentId) {
    try {
        // FOR TESTNET: We simulate approval. In real app, send to YOUR server
        console.log("Approving payment:", paymentId);
        
        // SIMULATION: Wait 2 seconds then tell Pi it's approved
        setTimeout(() => {
            document.getElementById('status').innerText = "Server approved. Waiting for wallet confirmation...";
        }, 2000);
        
        /* 
        REAL BACKEND CODE - UNCOMMENT WHEN YOU HAVE SERVER:
        const response = await fetch(`${BACKEND_URL}/payments/approve`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentId: paymentId })
        });
        */

    } catch (error) {
        document.getElementById('status').innerText = "Approval failed: " + error;
    }
}

// 4. FUNCTION TO COMPLETE PAYMENT ON BACKEND
async function completePaymentOnBackend(paymentId, txid = null) {
    try {
        console.log("Completing payment:", paymentId, txid);
        
        // SIMULATION: Show success
        setTimeout(() => {
            document.getElementById('status').innerText = `Payment completed successfully! Tx: ${txid}`;
        }, 2000);
        
        /* 
        REAL BACKEND CODE - UNCOMMENT WHEN YOU HAVE SERVER:
        const response = await fetch(`${BACKEND_URL}/payments/complete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentId: paymentId, txid: txid })
        });
        */

    } catch (error) {
        document.getElementById('status').innerText = "Completion failed: " + error;
    }
}
