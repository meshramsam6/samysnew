window.onload = function () {
    // Check if the user is logged in
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        // If not logged in, redirect to the login page
        window.location.href = '/AdminPanel/login/login.html';
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
    window.location.href = '/AdminPanel/login/login.html';
    
    // Prevent back navigation after logout
    history.pushState(null, null, location.href); // Add current state to history
    history.back(); // Go back to the previous page
    history.forward(); // Go forward to the login page
}


const username = localStorage.getItem('username');
const email = localStorage.getItem('email');

// Fetch existing categories from the products.json file and populate the category select dropdown
window.onload = function() {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            const categories = new Set(); // To ensure categories are unique

            // Loop through products and extract categories
            data.products.forEach(product => {
                categories.add(product.category);
            });

            // Populate the categories dropdown
            const categorySelect = document.getElementById('category');
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categorySelect.appendChild(option);
            });

            // Add "Add New Category" option
            const addNewCategoryOption = document.createElement('option');
            addNewCategoryOption.value = 'newCategoryOption';
            addNewCategoryOption.textContent = 'Add New Category';
            categorySelect.appendChild(addNewCategoryOption);
        })
        .catch(error => console.error('Error fetching categories:', error));
};

// Show/hide the input field for adding a new category
document.getElementById('category').addEventListener('change', function() {
    var newCategoryInput = document.getElementById('newCategory');
    var selectedValue = this.value;

    if (selectedValue === 'newCategoryOption') {
        newCategoryInput.classList.remove('hidden');  // Show input field
    } else {
        newCategoryInput.classList.add('hidden');  // Hide input field if another option is selected
    }
});

// Handle form submission
document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    // Send the form data to the PHP backend
    fetch('add_product.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const responseMessage = document.getElementById('responseMessage');
        if (data.success) {
            responseMessage.textContent = 'Product added successfully!';
            responseMessage.style.color = 'green';
        } else {
            responseMessage.textContent = 'Failed to add product.';
            responseMessage.style.color = 'red';
        }
    })
    .catch(error => console.error('Error submitting form:', error));
});
