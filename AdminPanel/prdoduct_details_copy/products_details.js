let products = []; // Will hold the products.json data
let selectedProduct = null;

// Load products on page load
window.onload = async () => {
    await fetchProducts();
    displayProducts();
};

// Fetch products from products.json
async function fetchProducts() {
    const response = await fetch("products.json");
    products = await response.json().products;
}

// Display products in HTML
function displayProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${product.url}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>Price: $${product.price}</p>
            <p>Category: ${product.category}</p>
            <button onclick="openEditModal(${product.id})">Edit</button>
        `;
        productList.appendChild(productCard);
    });
}

// Open edit modal
function openEditModal(productId) {
    selectedProduct = products.find((p) => p.id === productId);
    document.getElementById("edit-name").value = selectedProduct.name;
    document.getElementById("edit-price").value = selectedProduct.price;
    document.getElementById("edit-url2").value = selectedProduct.url2;
    document.getElementById("edit-detail").value = selectedProduct.detail;

    const categorySelect = document.getElementById("edit-category-existing");
    categorySelect.innerHTML = products
        .map((p) => `<option value="${p.category}">${p.category}</option>`)
        .join("");
    categorySelect.value = selectedProduct.category;

    document.getElementById("edit-modal").style.display = "flex";
}

// Close edit modal
function closeEditModal() {
    document.getElementById("edit-modal").style.display = "none";
    selectedProduct = null;
}

// Handle form submission
document.getElementById("edit-form").onsubmit = (event) => {
    event.preventDefault();

    const newName = document.getElementById("edit-name").value;
    const newPrice = document.getElementById("edit-price").value;
    const newUrl2 = document.getElementById("edit-url2").value;
    const newCategory = document.getElementById("edit-category-new").value || document.getElementById("edit-category-existing").value;
    const newDetail = document.getElementById("edit-detail").value;

    if (selectedProduct) {
        selectedProduct.name = newName;
        selectedProduct.price = newPrice;
        selectedProduct.url2 = newUrl2;
        selectedProduct.category = newCategory;
        selectedProduct.detail = newDetail;

        displayProducts();
        closeEditModal();
    }
};
