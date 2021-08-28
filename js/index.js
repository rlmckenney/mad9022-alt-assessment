import * as giftr from './giftr-service.js'

document.addEventListener('DOMContentLoaded', init)

function init() {
  addEventListeners()
}

function addEventListeners() {
  document.getElementById('login-btn').addEventListener('click', loginUser)
}

async function loginUser() {
  const loginButton = document.getElementById('login-btn')
  loginButton.innerText = 'pending ...'
  const email = 'm.mouse@disney.com'
  const password = '123456'

  await giftr.getNewAuthToken(email, password)
  loginButton.innerText = 'Login'

  if (giftr.userIsAuthenticated()) {
    const user = await giftr.getCurrentUser()
    console.log(user)
  }
}
