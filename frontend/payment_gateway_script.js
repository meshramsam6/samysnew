window.onload = function () {
    // Check if the user is logged in
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        // If not logged in, redirect to the login page
        window.location.href = '/login.html';
    }
};

function logout() {
    // Clear session data from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    
    // Alert the user about logout
    alert('You have been logged out.');
    
    // Redirect to login page
    window.location.href = '/login.html';
    
    // Prevent back navigation after logout
    history.pushState(null, null, location.href); // Add current state to history
    history.back(); // Go back to the previous page
    history.forward(); // Go forward to the login page
}

const username = localStorage.getItem('username');
const email = localStorage.getItem('email');

// Function to get URL parameter
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get the amount from the URL
const amount = getQueryParam('amount');

// Display the amount on the page
if (amount && !isNaN(amount) && Number(amount) > 0) {
    document.querySelector('.total-amount').textContent = `₹${parseFloat(amount).toFixed(2)}`;
} else {
    alert('Invalid amount. Please go back and try again.');
    document.querySelector('.pay-button').disabled = true; // Disable payment button if invalid amount
}

// UPI Payment Details
const upiId = 'samm9421-3@okicici'; // Replace with your UPI ID
const name = 'Sam'; // Optional: Add the payee name

// Function to generate the UPI payment string
function generateUPIPaymentString(upiId, name, amount) {
    return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${encodeURIComponent(amount)}&cu=INR`;
}

// Generate the UPI payment string
const upiPaymentString = generateUPIPaymentString(upiId, name, amount);

// Generate QR code URL for the UPI payment string
const upiQRCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiPaymentString)}`;

// Set the QR code image source
document.getElementById('upiQRCode').src = upiQRCodeUrl;

// Set the UPI ID display
document.getElementById('upiId').textContent = upiId;

// Payment button event listener
document.querySelector('.pay-button').addEventListener('click', () => {
    alert('Proceeding to payment through UPI. Please complete the payment using the scanned QR code.');
});

// Payment confirmation button event listener
document.querySelector('.confirm-payment-button').addEventListener('click', async () => {
    // Simulating payment verification by calling your PHP server
    const paymentData = {
        amount: amount,
        upiId: upiId,
        // Include any other necessary information (like order ID, etc.)
    };

    try {
        const response = await fetch('payment_confirmation.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message); // Payment successful
            window.location.href = 'myorder.html'; // Redirect on success
        } else {
            alert(result.message); // Payment failed
        }
    } catch (error) {
        alert('An error occurred while confirming the payment. Please try again.');
        console.error(error);
    }
});

// Optional: Add interactivity for copy UPI ID feature
const upiIdElement = document.getElementById('upiId');
upiIdElement.addEventListener('click', () => {
    navigator.clipboard.writeText(upiId).then(() => {
        alert('UPI ID copied to clipboard!');
    }).catch(() => {
        alert('Failed to copy UPI ID.');
    });
});


const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Change Navbar Style on Scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Toggle Mobile Menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
});