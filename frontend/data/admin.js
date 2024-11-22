document.addEventListener("DOMContentLoaded", function() {
    // Fetch existing categories from the JSON file
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            const categories = new Set();
            data.products.forEach(product => categories.add(product.category));

            // Add categories to the dropdown
            const categorySelect = document.getElementById("category");
            categories.forEach(category => {
                const option = document.createElement("option");
                option.value = category;
                option.textContent = category;
                categorySelect.appendChild(option);
            });
        });

    // Handle form submission
    const form = document.getElementById("productForm");
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const price = document.getElementById("price").value;
        const imageFile = document.getElementById("image").files[0];
        const url2 = document.getElementById("url2").value;
        let category = document.getElementById("category").value;
        const newCategory = document.getElementById("newCategory").value;

        if (newCategory) {
            category = newCategory;
        }

        // Prepare form data to send to PHP
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('image', imageFile);
        formData.append('url2', url2);
        formData.append('category', category);

        // Send the form data to PHP for processing
        fetch('add_product.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Product added successfully!");
                form.reset(); // Clear the form
            } else {
                alert("Error adding product.");
            }
        })
        .catch(error => console.error('Error:', error));
    });
});
