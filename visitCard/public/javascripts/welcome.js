

const setup = () => {
  document.getElementById('login-button')?.addEventListener('click', clickLogin);
  
  document.getElementById('register-button').addEventListener('click', clickRegister);  
};
const clickLogin = () => {
  const data = {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  };

  fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(data => {
    })
    .catch(error => {
    });
}
const clickRegister = () => {
  window.location.href = '/register';
}
window.addEventListener('DOMContentLoaded', setup);