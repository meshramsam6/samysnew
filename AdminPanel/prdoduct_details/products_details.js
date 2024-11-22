// Function to send updated product data to the server
function sendUpdateRequest(productId, price, url, url2, category, details) {
    const updatedProduct = {
        id: productId,
        price: price,
        url: url || null, // If no new URL, keep existing
        url2: url2,
        category: category,
        detail: details
    };

    console.log("Sending updated data:", updatedProduct); // Debugging

    // Sending data to the backend (PHP) using a POST request
    fetch("products_details.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct) // Sending the updated product data as JSON
    })
    .then(response => response.json()) // Parse the response
    .then(data => {
        console.log("Response from server:", data); // Debugging
        if (data.status === "success") {
            alert(data.message); // Success message
            location.reload(); // Refresh the page to show updated data
        } else {
            alert(data.message); // Error message
        }
    })
    .catch(error => {
        console.error("Error during update:", error); // Log any errors
        alert("An error occurred while updating the product.");
    });
}

// Image upload handling function
function uploadImage(formData) {
    fetch('products_details.php', {
        method: 'POST',
        body: formData // Sending image data to backend for upload
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Image uploaded successfully');
            document.getElementById('productImage').src = data.url; // Update image preview on success
        } else {
            alert(data.message); // Show error message if upload fails
        }
    })
    .catch(error => {
        console.error('Error uploading image:', error); // Log upload error
        alert('An error occurred while uploading the image.');
    });
}

// Function to handle the image input change event
document.getElementById('imageUploadInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/PNG')) {
        const formData = new FormData();
        formData.append('image', file);

        // Call the function to upload the image to the server
        uploadImage(formData);
    } else {
        alert('Invalid file type. Please upload a PNG image.');
    }
});
