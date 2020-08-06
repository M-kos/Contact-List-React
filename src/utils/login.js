const storageName = 'login'

export const login = user => {
  let userData = user

  if (userData) {
    localStorage.setItem(storageName, JSON.stringify({...userData}))
  }

  const data = JSON.parse(localStorage.getItem(storageName))
  
  if (data && data.name && data.password) {
    userData = {...data}
  }

  return userData
}

export const logout = () => {
  localStorage.removeItem(storageName)
}