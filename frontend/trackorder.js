const username = localStorage.getItem('username');
const email = localStorage.getItem('email');

// trackorder.js

// Function to get query parameters from URL
function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const pairs = queryString.split("&");
    pairs.forEach(pair => {
        const [key, value] = pair.split("=");
        params[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return params;
}

// Display the product details based on query parameters
function displayOrderDetails() {
    const params = getQueryParams();
    if (params.product_id && params.title) {
        const orderInfoDiv = document.getElementById('order-info');
        orderInfoDiv.innerHTML = `
            <img src="${params.url}" alt="${params.name}" style="padding: 10px;">
            <p><strong>Product:</strong> ${params.title}</p>
            <p><strong>Price:</strong> ₹${params.price}</p>
            <p><strong>Quantity:</strong> ${params.quantity}</p>
            <p><strong>Total:</strong> ₹${params.price * params.quantity}</p>
        `;

        // Update progress bar based on some status (mocked here for demonstration)
        updateProgressBar("Out for Delivery");
    } else {
        document.getElementById('order-info').innerHTML = '<p>Order details not found.</p>';
    }
}

// Function to update progress bar based on order status, without "Shipped"
function updateProgressBar(status) {
    const progressBar = document.getElementById('progress-bar');
    const steps = document.querySelectorAll('.step');
    let progress = 0;

    switch (status) {
        case 'Ordered':
            progress = 33;
            steps[0].classList.add('active');
            break;
        case 'Out for Delivery':
            progress = 66;
            steps[0].classList.add('active');
            steps[1].classList.add('active');
            break;
        case 'Delivered':
            progress = 100;
            steps[0].classList.add('active');
            steps[1].classList.add('active');
            steps[2].classList.add('active');
            break;
        default:
            progress = 0;
    }

    progressBar.style.width = progress + '%';
}

// Display the order details when the page loads
window.onload = displayOrderDetails;



// Extract URL Parameters
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);

    // Get parameters
    const productId = urlParams.get("product_id");
    const title = urlParams.get("title") || "Product Title Not Available";
    const price = urlParams.get("price");
    const quantity = urlParams.get("quantity");
    const imageUrl = decodeURIComponent(urlParams.get("url"));

    // Update DOM elements
    const orderInfo = document.getElementById("order-info");
    orderInfo.innerHTML = `
        <img src="${imageUrl}" alt="${title}">
        <p><strong>Product ID:</strong> ${productId}</p>
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Price:</strong> $${parseFloat(price).toFixed(2)}</p>
        <p><strong>Quantity:</strong> ${quantity}</p>
        <p><strong>Total:</strong> $${(parseFloat(price) * parseInt(quantity)).toFixed(2)}</p>
    `;
});
