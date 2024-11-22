const username = localStorage.getItem('username');
const email = localStorage.getItem('email');

// Get the cart data from localStorage
let cart = JSON.parse(localStorage.getItem('checkoutCart')) || [];
let products = [];

// Fetch product data
fetch('/frontend/data/products.json')
    .then(response => response.json())
    .then(data => {
        products = data.products;
        displayCartItems();
    })
    .catch(error => {
        console.error('Error fetching product data:', error);
        alert('There was an error loading the products. Please try again later.');
    });

// Function to display cart items in the checkout page
const displayCartItems = () => {
    let list = document.querySelector('.list');
    list.innerHTML = '';  // Clear any existing content

    if (cart.length > 0) {
        let totalQuantity = 0;
        let totalPrice = 0;
        cart.forEach(item => {
            // Find product from the products array
            let product = products.find(prod => prod.id == item.id);
            if (product) {
                // Calculate total for this item
                let itemTotal = product.price * item.quantity;
                totalQuantity += item.quantity;
                totalPrice += itemTotal;

                // Make sure the image URL exists and is correct
                let imageUrl = product.imageUrl || '/frontend/images/default-image.png'; // Fallback image

                // Create a new item element for display
                let newItem = document.createElement('div');
                newItem.classList.add('item');
                newItem.innerHTML = `
                    <img src="${imageUrl}" alt="${product.name}" />
                    <div class="info">
                        <div class="name">${product.name}</div>
                        <div class="price">₹${product.price} per item</div>
                    </div>
                    <div class="quantity">${item.quantity}</div>
                    <div class="returnPrice">₹${itemTotal.toFixed(2)}</div>
                `;
                list.appendChild(newItem);
            }
        });

        // Update total quantity and price
        document.querySelector('.totalQuantity').textContent = totalQuantity;
        document.querySelector('.totalPrice').textContent = `₹${totalPrice.toFixed(2)}`;
    } else {
        list.innerHTML = '<p>No items in the cart.</p>';
    }
};

// Checkout button click event
document.querySelector('.buttonCheckout').addEventListener('click', function () {
    let totalPrice = document.querySelector('.totalPrice').textContent.replace('₹', '').trim();

    // Check if the cart is not empty
    if (totalPrice > 0) {
        // Get user details
        const name = document.querySelector('#name').value.trim();
        const phone = document.querySelector('#phone').value.trim();
        const address = document.querySelector('#address').value.trim();
        const country = document.querySelector('#country').value;
        const city = document.querySelector('#city').value;

        // Validate form inputs
        if (name && phone && address && country && city) {
            // Prepare data to send to the backend
            const checkoutData = {
                user: {
                    name: name,
                    phone: phone,
                    address: address,
                    country: country,
                    city: city,
                    email: 'samm9421@gmail.com' // Use the fixed email or update based on localStorage or other logic
                },
                cartItems: cart.map(item => {
                    // Find the product using the product_id
                    let product = products.find(prod => prod.id == item.id);
                    return {
                        product_id: item.id,
                        product_name: product ? product.name : '',  // Store product name
                        quantity: item.quantity
                    };
                }),
                totalQuantity: document.querySelector('.totalQuantity').textContent,
                totalPrice: totalPrice
            };

            console.log('Sending checkout data:', checkoutData);  // Debugging output

            // Send data to save_checkout.php via POST request
            fetch('save_checkout.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(checkoutData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Response from PHP:', data);  // Debugging output
                if (data.success) {
                    alert('Checkout Successful!');
                    // Optionally, clear the cart after successful checkout
                    localStorage.removeItem('checkoutCart');
                    window.location.href = `payment-gateway.html?amount=${encodeURIComponent(totalPrice)}`;
                } else {
                    alert('There was an error with the checkout process. Please try again.');
                }
            })
            .catch(error => {
                alert('Failed to process the checkout. Please try again.');
                console.error('Error:', error);
            });
        } else {
            alert('Please fill in all the required fields before proceeding to checkout.');
        }
    } else {
        alert('Your cart is empty. Please add items to the cart before checking out.');
    }
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