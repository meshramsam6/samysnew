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

let orderListHTML = document.getElementById('order-list');

// Retrieve cart data from localStorage
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Get the current date and time
const orderDate = new Date().toLocaleString();

// Variable to hold the total sales and revenue
let totalSales = 0;
let totalRevenue = 0;

// Fetch product data
fetch('/frontend/data/products.json')
    .then(response => response.json())
    .then(data => {
        let products = data.products; // Array of products

        // Function to display order items
        const displayOrderItems = () => {
            if (cart && cart.length > 0) {
                cart.forEach(item => {
                    // Find product info using product_id
                    let product = products.find(product => product.id == item.id);
                    if (product) {
                        let orderItem = document.createElement('div');
                        orderItem.classList.add('order-item');
                        let itemTotal = parseFloat(product.price) * item.quantity; // Total price for the item
                        totalRevenue += itemTotal; // Add to total revenue

                        orderItem.innerHTML = `
                            <img src="${product.url}" alt="${product.title}" style="padding: 10px;">
                            <div class="order-details">
                                <p><strong>${product.name}</strong></p>
                                <p>Price: ₹${product.price}</p>
                                <p>Quantity: ${item.quantity}</p>
                                <p>Total: ₹${itemTotal.toFixed(2)}</p>
                                <p>Order Date: ${orderDate}</p>
                                <a href="invoice.html?product_id=${item.id}&title=${encodeURIComponent(product.title)}&price=${product.price}&quantity=${item.quantity}&url=${encodeURIComponent(product.url)}" class="download-invoice" style="padding: 8px 12px;">Download Invoice</a>
                                <a href="trackorder.html?product_id=${item.id}&title=${encodeURIComponent(product.title)}&price=${product.price}&quantity=${item.quantity}&url=${encodeURIComponent(product.url)}" class="track-order" style="padding: 8px 12px;">Track Order</a>
                            </div>
                        `;
                        orderListHTML.appendChild(orderItem);

                        // Calculate total sales for today
                        totalSales += itemTotal; // Add to today's sales
                    }
                });
            } else {
                orderListHTML.innerHTML = '<p>Your cart is empty.</p>';
            }
        };

        displayOrderItems();

        // Store today's sales and total revenue in localStorage for the admin panel to fetch
        updateAdminPanelSalesRevenue(totalSales, totalRevenue);
    })
    .catch(error => console.error('Error fetching product data:', error));

// Function to update admin panel sales and revenue in localStorage
function updateAdminPanelSalesRevenue(todaySales, totalRevenue) {
    // Store today's sales and total revenue in localStorage
    localStorage.setItem('todaySales', todaySales.toFixed(2));
    localStorage.setItem('totalRevenue', totalRevenue.toFixed(2));
}
















const submitOrderButton = document.getElementById('submit-order');
const loadingOverlay = document.getElementById('loading-overlay');

submitOrderButton.addEventListener('click', function() {
    loadingOverlay.style.display = 'flex'; // Show loading overlay
    // Simulate order submission (e.g., with a timeout)
    setTimeout(() => {
        loadingOverlay.style.display = 'none'; // Hide loading overlay after 3 seconds
        alert("Order Submitted Successfully!");
    }, 3000);
});
