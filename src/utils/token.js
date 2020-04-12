

function setToken(vale, name = "token") {
  localStorage.setItem(name, vale)
}

function getToken(name = "token") {
  return localStorage.getItem(name)
}

function removeToken(name = "token") {
  localStorage.removeItem(name);
}

export { setToken, getToken, removeToken }