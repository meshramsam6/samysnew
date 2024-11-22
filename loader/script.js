const username = localStorage.getItem('username');
const email = localStorage.getItem('email');

gsap.fromTo(
  ".loading-page",
  { opacity: 1 },
  {
    opacity: 0,
    display: "none",
    duration: 1.5,
    delay: 3.5,
    onComplete: () => {
      window.location.href = "/frontend/index.html"; // Redirect to login.html after the loader completes
    }
  }
);

gsap.fromTo(
  ".logo-name",
  {
    y: 50,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 2,
    delay: 0.5,
  }
);

document.addEventListener('DOMContentLoaded', () => {
  const username = localStorage.getItem('username');
  if (username) {
    console.log(`Welcome back, ${username}!`);
    const welcomeMessage = document.querySelector('#welcomeMessage');
    if (welcomeMessage) {
      welcomeMessage.textContent = `Welcome, ${username}!`;
    }
  }
});

