const API_BASE_URL = 'https://giftr.mad9124.rocks'
const API_KEY = 'mckennr' // TODO: this should be YOUR college username

const state = {
  /*
   * Example of using Getters and Setters to add special handling
   * of object property values. @see https://javascript.info/property-accessors
   *
   * Use a pseudo-private property `state._jwt` to store the actual token value.
   * All references to the state.authToken property will be filtered through
   * the `get` and `set` methods below. In this example, the value is
   * automatically stored to and retrieved from localStorage.
   *
   * NOTE: the getter and setter functions must be synchronous - no promises.
   */
  get authToken() {
    if (!this._jwt) {
      this._jwt = JSON.parse(localStorage.getItem('jwt')) || null
    }
    return this._jwt
  },
  set authToken(value) {
    this._jwt = value
    localStorage.setItem('jwt', JSON.stringify(value))
  }
}

/**
 * This common headers object can be used in every fetch call to the API server.
 */
const defaultHeaders = () => ({
  'Content-Type': 'application/json',
  'x-api-key': API_KEY,
  Authorization: `Bearer ${state.authToken}`
})

/**
 * Authenticate the user and store the JWT if successful.
 * @param {string} email
 * @param {string} password
 * @returns
 */
export async function getNewAuthToken(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/tokens`, {
    method: 'POST',
    headers: defaultHeaders(),
    body: JSON.stringify({email, password})
  })

  if (!response.ok) {
    console.warn(response)
    return null
  }

  const {data} = await response.json()
  state.authToken = data.token
  return data.token
}

/**
 * Check if there is a currently authenticated user.
 * @return {boolean}
 */
export async function userIsAuthenticated() {
  return Boolean(state.authToken)
}

/**
 * Fetch the full User object for the currently logged-in user.
 * @returns {Object | null} User object
 */
export async function getCurrentUser() {
  if (!userIsAuthenticated()) return null

  const response = await fetch(`${API_BASE_URL}/auth/users/me`, {
    method: 'GET',
    headers: defaultHeaders()
  })

  if (!response.ok) {
    console.warn(response)
    return null
  }

  const {data} = await response.json()
  return data
}

/**
 * Send the new user's attributes to the API server. Returns either the new
 * User object or the errors object received from the API server.
 * @param {Object} user
 * @param {string} user.firstName Required
 * @param {string} user.lastName
 * @param {string} user.email Required
 * @param {string} user.password  Required
 *
 * @returns {Object}
 */
export async function registerUser(user) {}
