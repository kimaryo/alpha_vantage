export function setToken(token) {
  localStorage.setItem('TOKEN_STORAGE', JSON.stringify(token))
}

export function getToken() {
  return JSON.parse(localStorage.getItem('TOKEN_STORAGE'))
}

export function removeToken() {
  localStorage.removeItem('TOKEN_STORAGE')
}
