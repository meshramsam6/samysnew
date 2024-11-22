// Get the button element
const themeToggleButton = document.getElementById('theme-toggle');

// Check if dark mode is already set in localStorage
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    document.querySelector('h1').classList.add('dark-mode');
    document.querySelector('button').classList.add('dark-mode');
}

// Add event listener to toggle theme
themeToggleButton.addEventListener('click', () => {
    // Toggle dark mode
    document.body.classList.toggle('dark-mode');
    document.querySelector('h1').classList.toggle('dark-mode');
    document.querySelector('button').classList.toggle('dark-mode');
    
    // Save the current theme in localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});
