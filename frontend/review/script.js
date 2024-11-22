window.onload = () => {
    const welcomeMessage = document.getElementById('welcomeMessage');
    const thankYouMessage = document.getElementById('thankYouMessage');
    const username = document.getElementById('username');

    // Show "Welcome" message
    setTimeout(() => {
        welcomeMessage.style.opacity = '1'; // Fade in "Welcome"
        welcomeMessage.classList.add('fadeIn');
    }, 500); // Delay to start animation

    // Dust effect on "Welcome" after 1 second
    setTimeout(() => {
        welcomeMessage.classList.add('dust');
    }, 2000); // Start dust effect after 2 seconds

    // Show "Thank you for your feedback"
    setTimeout(() => {
        thankYouMessage.style.opacity = '1'; // Fade in "Thank you for your feedback"
        thankYouMessage.classList.add('fadeIn');
    }, 4000); // Delay after "Welcome" message disappears

    // Dust effect on "Thank you for your feedback"
    setTimeout(() => {
        thankYouMessage.classList.add('dust');
    }, 6000); // Start dust effect after 6 seconds

    // Show username (e.g., "Username")
    setTimeout(() => {
        username.style.opacity = '1'; // Fade in username
        username.classList.add('fadeIn');
    }, 8000); // Delay after second message disappears

    // Dust effect on username
    setTimeout(() => {
        username.classList.add('dust');
    }, 10000); // Start dust effect after 10 seconds

    // Transition to index.html
    setTimeout(() => {
        window.location.href = "index.html"; // Redirect to index.html
    }, 12000); // After everything dissolves, wait 12 seconds before loading the new page
};
