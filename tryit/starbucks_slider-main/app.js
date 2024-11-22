const username = localStorage.getItem('username');
const email = localStorage.getItem('email');

// Step 1: Get DOM elements
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');
let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');

// Load products from JSON file
fetch('../frontend/data/products.json')
    .then(response => response.json())
    .then(data => {
        data.products.forEach(product => {
            // Create slide item
            const slideItem = document.createElement('div');
            slideItem.classList.add('item');
            slideItem.innerHTML = `
                <div class="image">
                    <img src="${product.url2}" alt="${product.name}">
                    <figcaption>${product.name}</figcaption>
                </div>
                <div class="main-content">
                    <div class="content">
                        <h2>${product.name}</h2>
                        <div class="price">₹${product.price}</div>
                        <button class="addToCard">Add To Cart</button>
                    </div>
                </div>
            `;
            SliderDom.appendChild(slideItem);

            // Create thumbnail item
            const thumbnailItem = document.createElement('div');
            thumbnailItem.classList.add('item');
            thumbnailItem.innerHTML = `
                <img src="${product.url2}" alt="${product.name}">
            `;
            thumbnailBorderDom.appendChild(thumbnailItem);
        });

        // Start the carousel after loading products
        startCarousel();
    })
    .catch(error => console.error('Error loading product data:', error));

// Step 2: Initialize the carousel after loading products
function startCarousel() {
    let timeRunning = 3000; // Time for content to stay on screen
    let timeAutoNext = 7000; // Time before auto move to next slide

    nextDom.onclick = function () {
        showSlider('next');
    }

    prevDom.onclick = function () {
        showSlider('prev');
    }

    let runTimeOut;
    let runNextAuto = setTimeout(() => {
        nextDom.click();
    }, timeAutoNext);

    function showSlider(type) {
        let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
        let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.carousel .thumbnail .item');

        if (type === 'next') {
            SliderDom.appendChild(SliderItemsDom[0]);
            thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
            carouselDom.classList.add('next');
        } else {
            SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
            thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
            carouselDom.classList.add('prev');
        }

        clearTimeout(runTimeOut);
        runTimeOut = setTimeout(() => {
            carouselDom.classList.remove('next');
            carouselDom.classList.remove('prev');
        }, timeRunning);

        clearTimeout(runNextAuto);
        runNextAuto = setTimeout(() => {
            nextDom.click();
        }, timeAutoNext);
    }
}

// Dummy function for "Add to Cart"
function subscribeProduct(productId) {
    alert(`Product with ID ${productId} added to cart.`);
}
