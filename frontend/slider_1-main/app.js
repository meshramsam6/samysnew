const username = localStorage.getItem('username');
const email = localStorage.getItem('email');

// Step 1: Get DOM elements
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let timeDom = document.querySelector('.carousel .time');

// Load products from JSON file
fetch('/frontend/data/products.json')
    .then(response => response.json())
    .then(data => {
        data.products.forEach(product => {
            // Create slide item
            const slideItem = document.createElement('div');
            slideItem.classList.add('item');
            slideItem.innerHTML = `
                <img src="${product.url2}" alt="${product.name}">
                <div class="content">
                    <div class="author">LUNDEV</div>
                    <div class="title">${product.name}</div>
                    <div class="topic">${product.category}</div>
                    <div class="des">Price: ₹${product.price}</div>
                    <div class="buttons">
                        <button>SEE MORE</button>
                       <button onclick="subscribeProduct(${product.id})">Add To Cart</button>
                    </div>
                </div>
            `;
            SliderDom.appendChild(slideItem);

            // Create thumbnail item
            const thumbnailItem = document.createElement('div');
            thumbnailItem.classList.add('item');
            thumbnailItem.innerHTML = `
                <img src="${product.url2}" alt="${product.name}">
                <div class="content">
                    <div class="title">${product.name}</div>
                    <div class="description">Price:₹${product.price}</div>
                </div>
            `;
            thumbnailBorderDom.appendChild(thumbnailItem);
        });

        // Start the carousel after loading products
        startCarousel();
    })
    .catch(error => console.error('Error loading product data:', error));

// Initialize the carousel after loading products
function startCarousel() {
    let timeRunning = 3000;
    let timeAutoNext = 7000;

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
