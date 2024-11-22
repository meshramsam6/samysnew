document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const signinBtn = document.getElementById('signin-btn');

  // Check if the user is already logged in by checking localStorage for loggedInUser
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (loggedInUser) {
    const user = JSON.parse(loggedInUser);
    signinBtn.textContent = user.username ? user.username.charAt(0).toUpperCase() : 'U'; // Use the first letter of the username or 'U' as default
    signinBtn.href = 'userid.html'; // Redirect to the user's page
  }

  // Handle the login form submission
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Check if email or password is empty (optional validation step)
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    // Generate a simple username from the email (using the part before '@')
    const username = email.split('@')[0]; // Use the part before '@' in the email as the username

    // Store email, password, and username in localStorage
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    const user = {
      username: username, // Dynamic username based on email
      email: email 
    };

    // Store the user object in localStorage
    localStorage.setItem('loggedInUser', JSON.stringify(user));

    // Update the signin button with the user's first letter of username
    signinBtn.textContent = user.username.charAt(0).toUpperCase(); // Show first letter of username
    signinBtn.href = 'userid.html'; // Redirect to the user's page

    // Redirect to the 'userid.html' page after successful login
    window.location.href = 'userid.html';
  });

  // Handle the click event on the signin button (to show the login form if not logged in)
  signinBtn.addEventListener('click', () => {
    if (!loggedInUser) {
      document.querySelector('.wrapper').style.display = 'block'; // Show the login form
    }
  });

  // Close the login form when clicking the close button
  document.querySelector('.close-form').addEventListener('click', () => {
    document.querySelector('.wrapper').style.display = 'none'; // Hide the login form
  });
});
