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


const username = localStorage.getItem('username') || '';
const email = localStorage.getItem('email') || '';

let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];
let cart = [];

// Toggle cart visibility
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

// Fetch and display products
const addDataToHTML = () => {
    listProductHTML.innerHTML = ''; // Clear current list
    if (products.length > 0) {
        products.forEach(product => {
            if (product && product.id && product.name && product.price) {
                let newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('item');
                newProduct.innerHTML = `
                    <img src="${product.url}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <div class="price">₹${product.price}</div>
                    <button class="addCart">Add To Cart</button>`;
                listProductHTML.appendChild(newProduct);
            }
        });
    }
};

// Handle product click to add to cart
listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let id_product = positionClick.parentElement.dataset.id;
        if (id_product) {
            addToCart(id_product);
        }
    }
});

// Add item to cart
const addToCart = (product_id) => {
    product_id = parseInt(product_id); // Ensure consistency with the product id

    // Check if the product is valid
    let product = products.find((prod) => prod.id == product_id);
    if (!product) {
        console.error(`Product with ID ${product_id} not found.`);
        return;
    }

    // Check if the product is already in the cart
    let positionThisProductInCart = cart.findIndex((value) => value.id == product_id);

    if (positionThisProductInCart < 0) {
        // Add the product if it isn't already in the cart
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.url,
            quantity: 1
        });
    } else {
        // Update quantity if product is in the cart
        cart[positionThisProductInCart].quantity += 1;
    }

    // Update the cart in localStorage and HTML
    addCartToHTML();
    addCartToMemory();
};

// Update cart in localStorage
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

// Display cart items
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';  // Clear cart list
    let totalQuantity = 0;
    let totalPrice = 0;

    if (cart.length > 0) {
        cart.forEach(item => {
            if (item && item.id && item.name && item.price) {
                totalQuantity += item.quantity;
                totalPrice += item.price * item.quantity;

                let newItem = document.createElement('div');
                newItem.classList.add('item');
                newItem.dataset.id = item.id;

                newItem.innerHTML = `
                    <div class="image">
                        <img src="${item.imageUrl}" alt="${item.name}">
                    </div>
                    <div class="name">${item.name}</div>
                    <div class="totalPrice">₹${item.price * item.quantity}</div>
                    <div class="quantity">
                        <span class="minus"><</span>
                        <span>${item.quantity}</span>
                        <span class="plus">></span>
                    </div>`;
                listCartHTML.appendChild(newItem);
            }
        });
    }

    iconCartSpan.innerText = totalQuantity;

    // Optionally, display the total price
    let totalPriceElement = document.querySelector('.totalPriceAmount');
    if (totalPriceElement) {
        totalPriceElement.innerText = `₹${totalPrice}`;
    }
};

// Handle cart item quantity change
listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = positionClick.classList.contains('plus') ? 'plus' : 'minus';
        if (product_id) {
            changeQuantityCart(product_id, type);
        }
    }
});

// Change item quantity in the cart
const changeQuantityCart = (product_id, type) => {
    product_id = parseInt(product_id); // Ensure consistency with the product id

    let positionItemInCart = cart.findIndex((value) => value.id == product_id);
    if (positionItemInCart >= 0) {
        if (type === 'plus') {
            cart[positionItemInCart].quantity += 1;
        } else {
            let changeQuantity = cart[positionItemInCart].quantity - 1;
            if (changeQuantity > 0) {
                cart[positionItemInCart].quantity = changeQuantity;
            } else {
                cart.splice(positionItemInCart, 1);  // Remove item from cart if quantity is 0
            }
        }
    }

    // Update the cart in localStorage and HTML
    addCartToHTML();
    addCartToMemory();
};

// Initialize app
const initApp = () => {
    fetch('/frontend/data/products.json')
        .then(response => response.json())
        .then(data => {
            products = data.products || [];
            addDataToHTML();

            // Retrieve cart data from localStorage if it exists
            let storedCart = localStorage.getItem('cart');
            cart = storedCart ? JSON.parse(storedCart) : [];
            addCartToHTML();
        }).catch((error) => {
            console.error('Error loading products:', error);
        });
};

initApp();

// Checkout button functionality
const checkoutButton = document.querySelector('.checkOut');
checkoutButton.addEventListener('click', () => {
    if (cart && cart.length > 0) {
        localStorage.setItem('checkoutCart', JSON.stringify(cart));
        window.location.href = 'checkout.html';
    } else {
        alert("Your cart is empty. Please add some items before checking out.");
    }
});

// Navbar functionality
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
