/* JavaScript File (script.js) */
const switchModeText = document.querySelector('.switch-mode span');
switchModeText.addEventListener('click', () => {
  const authTitle = document.querySelector('.auth-title');
  const authButton = document.querySelector('.auth-button');

  if (authTitle.textContent === 'User Login') {
    authTitle.textContent = 'Sign Up';
    authButton.textContent = 'Sign Up';
    switchModeText.textContent = 'Log In';
  } else {
    authTitle.textContent = 'User Login';
    authButton.textContent = 'Log In';
    switchModeText.textContent = 'Sign Up';
  }
});
