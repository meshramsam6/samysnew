const UsernameAdmin = localStorage.getItem('UsernameAdmin');
const EmailAdmin = localStorage.getItem('EmailAdmin');


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
    localStorage.setItem('isLoggedInAdmin', 'true');
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
            const UsernameAdmin = formData.get('UsernameAdmin'); // Get username from form data
            const EmailAdmin = formData.get('EmailAdmin'); // Get email from form data
            localStorage.setItem('UsernameAdmin', UsernameAdmin); // Store username in localStorage
            localStorage.setItem('EmailAdmin', EmailAdmin); // Store email in localStorage
            window.location.href = '/AdminPanel/loader/loader.html'; // Redirect to dashboard on success
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
