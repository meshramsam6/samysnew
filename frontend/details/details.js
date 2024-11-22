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

// Function to add a product to the cart in localStorage
function addToCart(id, name, price, imageUrl) {
    // Get existing cart from localStorage
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex(item => item.id === id);

    if (existingProductIndex >= 0) {
        // If product exists, update its quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // If product does not exist, add it with quantity 1
        cart.push({
            id,
            name,
            price,
            imageUrl,
            quantity: 1
        });
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Optionally, you can show a message or update the cart icon
    console.log('Product added to cart:', name);
}

// Extract the id from the URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Load products.json dynamically
fetch('/frontend/data/products.json') // Ensure the correct path to your products.json
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load products.json');
        }
        return response.json();
    })
    .then(data => {
        // Find product by id
        const product = data.products.find(p => p.id === parseInt(productId));
        if (product) {
            displayProductDetails(product);
        } else {
            showNotFoundError();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotFoundError();
    });

// Function to display product details
function displayProductDetails(product) {
    // Get DOM elements
    const productImage = document.getElementById('product-image');
    const productTitle = document.getElementById('product-title');
    const productCategory = document.getElementById('product-category');
    const productDetail = document.getElementById('product-detail');
    const productPrice = document.getElementById('product-price');
    const buyNowButton = document.getElementById('buy-now');

    // Set product details dynamically
    productImage.src = product.url; // Product image (large version)
    productImage.alt = product.name; // Alt text for the image
    productTitle.textContent = product.name; // Product name
    productCategory.textContent = product.category; // Product category
    productDetail.textContent = product.detail; // Product detail description
    productPrice.textContent = `₹${product.price}`; // Product price
    
    // Add event listener to the Buy Now button
    buyNowButton.onclick = () => {
        // Add the product to the cart
        addToCart(product.id, product.name, product.price, product.url);
        alert(`Added ${product.name} to your cart!`);
    };
}

// Function to handle missing or invalid product ID
function showNotFoundError() {
    const productContainer = document.querySelector('.product-container');
    productContainer.innerHTML = 
        '<p class="error-message">Product not found. Please check the URL and try again.</p>';
}