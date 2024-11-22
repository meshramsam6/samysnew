const username = localStorage.getItem('username');
const email = localStorage.getItem('email');

// Selecting elements for form toggling
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

// Toggle between login and registration forms
registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

// Show the login popup when login button is clicked
btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});

// Close the popup when the close icon is clicked
iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function (e) {
    localStorage.setItem('isLoggedIn', 'true');
    e.preventDefault(); // Prevent default form submission
    const formData = new FormData(this); // Get form data
 

    fetch('login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Show the response message
        if (data.includes('Login successful')) {
            const username = formData.get('username'); // Get username from form data
            const email = formData.get('email');
            localStorage.setItem('username', username);
            localStorage.setItem('email', email); 
            window.location.href = '/loader/index.html'; // Redirect to dashboard on success
        }
    })
    .catch(error => console.error('Error:', error));
});

// Handle registration form submission
document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission
    const formData = new FormData(this); // Get form data

    fetch('register.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Show the response message
        if (data.includes('Registration successful')) {
            wrapper.classList.remove('active'); // Switch to login form on successful registration
        }
    })
    .catch(error => console.error('Error:', error));
});



