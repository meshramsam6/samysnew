const username = localStorage.getItem('username');
const email = localStorage.getItem('email');

let prev = document.getElementById('prev');
let next = document.getElementById('next');
let imageContainer = document.querySelector('.images');
let contentContainer = document.querySelector('.content');

let rotate = 0;
let active = 0;
let countItem = 0;
let rotateAdd = 0;

// Fetch the products data from products.json
fetch('/frontend/data/products.json')
    .then(response => response.json())
    .then(data => {
        const products = data.products;
        countItem = products.length;
        rotateAdd = 360 / countItem;

        // Dynamically create image items and content
        products.forEach((product, index) => {
            // Create image item for slider
            const imageItem = document.createElement('div');
            imageItem.classList.add('item');
            imageItem.style.setProperty('--i', index + 1); // Use --i for CSS styling
            imageItem.innerHTML = `
                <img src="${product.url}" alt="${product.name}">
            `;
            imageContainer.appendChild(imageItem);

            // Create content item
            const contentItem = document.createElement('div');
            contentItem.classList.add('item');
            if (index === 0) contentItem.classList.add('active'); // Mark the first item as active by default
            contentItem.innerHTML = `
                <h1>${product.name}</h1>
                <div class="des">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit expedita tenetur consectetur. Ipsum, quibusdam recusandae impedit molestiae libero nobis nemo possimus perspiciatis. Debitis aliquam cum nemo aspernatur expedita ea?
                </div>
                <button>See more</button>
            `;
            contentContainer.appendChild(contentItem);
        });

        // Start the slider
        startSlider();
    })
    .catch(error => console.error('Error loading product data:', error));

function nextSlider() {
    // Only increase if it doesn't exceed the count, otherwise reset
    active = (active + 1) % countItem;
    rotate = rotate + rotateAdd;
    show();
}

function prevSlider() {
    // Only decrease if it doesn't go below zero, otherwise wrap around
    active = (active - 1 + countItem) % countItem;
    rotate = rotate - rotateAdd;
    show();
}

function show() {
    // Update rotation of the image container
    imageContainer.style.setProperty("--rotate", rotate + 'deg');

    // Update content container based on active index
    contentContainer.querySelectorAll('.item').forEach((content, key) => {
        if (key === active) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
}

prev.onclick = prevSlider;
next.onclick = nextSlider;

// Auto slider every 3 seconds
let autoNext;
function startAutoSlider() {
    autoNext = setInterval(nextSlider, 3000); // This will automatically rotate the slider every 3 seconds
}

// Start auto rotation on page load
startAutoSlider();

// Optional: Stop auto slider when hovering over the slider (Optional)
imageContainer.addEventListener('mouseenter', () => {
    clearInterval(autoNext); // Stop automatic rotation on hover
});

imageContainer.addEventListener('mouseleave', () => {
    // Restart auto rotation when mouse leaves
    startAutoSlider();
});
