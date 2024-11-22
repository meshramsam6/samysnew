window.onload = function () {
    // Check if the user is logged in
    if (localStorage.getItem('loggedInAdmin') !== 'true') {
        // If not logged in, redirect to the login page
        window.location.href = '/AdminPanel/login/login.html';
    }
};

function logout() {
    // Clear session data from localStorage
    localStorage.removeItem('loggedInAdmin');
    localStorage.removeItem('UsernameAdmin');
    localStorage.removeItem('EmailAdmin');
    
    // Alert the user about logout
    alert('You have been logged out.');
    
    // Redirect to login page
    window.location.href = '/AdminPanel/login/login.html';
    
    // Prevent back navigation after logout
    history.pushState(null, null, location.href); // Add current state to history
    history.back(); // Go back to the previous page
    history.forward(); // Go forward to the login page
}


const UsernameAdmin = localStorage.getItem('UsernameAdmin');
const EmailAdmin = localStorage.getItem('EmailAdmin');

// Elements for profile card and edit form
const editBtn = document.getElementById('editBtn');
const editForm = document.getElementById('editForm');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
const changePhotoBtn = document.getElementById('changePhotoBtn');
const fileInput = document.getElementById('fileInput');
const avatarImage = document.getElementById('avatarImage');
const successMessage = document.getElementById('successMessage'); // Success message element

// Function to fetch and display user profile details based on EmailAdmin
function fetchUserProfile() {
    fetch('/AdminPanel/login/users.json')
        .then(response => response.json())
        .then(data => {
            const user = data.users.find(u => u.EmailAdmin.toLowerCase() === EmailAdmin.toLowerCase());

            if (user) {
                // Populate profile card with user details
                document.getElementById('UsernameAdmin').textContent = user.UsernameAdmin || 'UsernameAdmin not available';
                document.getElementById('userEmailAdmin').textContent = user.EmailAdmin || 'EmailAdmin not provided';
                document.getElementById('userPhone').textContent = user.phone || 'Not provided';
                document.getElementById('userAddress').textContent = user.address || 'Not provided';
                document.getElementById('avatarImage').src = user.avatar || "https://via.placeholder.com/150";  // Default avatar if not provided
            } else {
                // If no user found with that EmailAdmin, show an error message or default data
                console.error("User not found.");
                document.getElementById('userEmailAdmin').textContent = EmailAdmin;
                document.getElementById('userPhone').textContent = 'Not provided';
                document.getElementById('userAddress').textContent = 'Not provided';
                document.getElementById('UsernameAdmin').textContent = 'User not found';
                document.getElementById('avatarImage').src = "https://via.placeholder.com/150"; // Default image
            }
        })
        .catch(error => {
            console.error("Error fetching users data:", error);
            // In case of error (e.g., JSON file not found or network error), set default values
            document.getElementById('userEmailAdmin').textContent = EmailAdmin;
            document.getElementById('userPhone').textContent = 'Not provided';
            document.getElementById('userAddress').textContent = 'Not provided';
            document.getElementById('UsernameAdmin').textContent = 'Error loading user data';
            document.getElementById('avatarImage').src = "https://via.placeholder.com/150"; // Default image
        });
}

// Fetch and display user profile on page load
fetchUserProfile();

// Edit profile functionality
editBtn.addEventListener('click', () => {
    editForm.style.display = 'block';
    editBtn.style.display = 'none';

    // Prefill the EmailAdmin field (readonly)
    document.getElementById('editEmailAdmin').value = EmailAdmin;
});

// Cancel the edit form
cancelBtn.addEventListener('click', () => {
    editForm.style.display = 'none';
    editBtn.style.display = 'block';
});

// Save the updated profile data
saveBtn.addEventListener('click', () => {
    const phone = document.getElementById('editPhone').value;
    const address = document.getElementById('editAddress').value;

    // Send the updated data to the server (PHP)
    fetch('updateProfile.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            EmailAdmin: EmailAdmin,  // EmailAdmin from localStorage
            phone: phone,
            address: address,
        })
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            // Update profile details on the page after saving
            document.getElementById('userPhone').textContent = phone;
            document.getElementById('userAddress').textContent = address;

            // Hide the form and show the updated profile
            editForm.style.display = 'none';
            editBtn.style.display = 'block';

            // Show success message
            successMessage.textContent = result.message;
            successMessage.style.display = 'block';

            // Hide success message after 3 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);

        } else {
            alert(result.message);  // Show error message if the update fails
        }
    })
    .catch(error => {
        console.error('Error updating profile:', error);
        alert('Failed to update profile.');
    });
});

// Change profile photo functionality
changePhotoBtn.addEventListener('click', () => {
    fileInput.click(); // Trigger file input click
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            avatarImage.src = event.target.result; // Change avatar image preview
        };
        reader.readAsDataURL(file);

        // Create FormData to send the image file to the server
        const formData = new FormData();
        formData.append('avatar', file);
        formData.append('EmailAdmin', EmailAdmin); // Send the user's EmailAdmin to associate the avatar with the correct user

        // Send the image to the server
        fetch('uploadAvatar.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                // Update avatar image source with the new uploaded image
                avatarImage.src = result.imageUrl; // The server returns the new image URL
                successMessage.textContent = 'Avatar updated successfully';
                successMessage.style.display = 'block';
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 3000);
            } else {
                alert(result.message);  // Show error message if the upload fails
            }
        })
        .catch(error => {
            console.error('Error uploading avatar:', error);
            alert('Failed to upload avatar.');
        });
    }
});
