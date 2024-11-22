document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const signinBtn = document.getElementById('signin-btn');

 
  const loggedInAdmin = localStorage.getItem('loggedInAdmin');
  if (loggedInAdmin) {
    const user = JSON.parse(loggedInAdmin);
    signinBtn.textContent = user.username.charAt(0).toUpperCase(); 
    signinBtn.href = 'userid.html'; 
  }

 
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); 

  
    const EmailAdmin = document.getElementById('EmailAdmin').value;
    const password = document.getElementById('password').value;

    localStorage.setItem('EmailAdmin', EmailAdminValue);
    localStorage.setItem('password', passwordValue);

    const user = {
      UsernameAdmin: 'JohnDoe',
      EmailAdmin: EmailAdmin 
    };

   
    localStorage.setItem('loggedInAdmin', JSON.stringify(user));

    signinBtn.textContent = user.username.charAt(0).toUpperCase();
    signinBtn.href = 'userid.html'; 

    window.location.href = 'userid.html';
  });

 
  signinBtn.addEventListener('click', () => {
    if (!loggedInAdmin) {
  
      document.querySelector('.wrapper').style.display = 'block';
    }
  });


  
  document.querySelector('.close-form').addEventListener('click', () => {
    document.querySelector('.wrapper').style.display = 'none';
  });
});
