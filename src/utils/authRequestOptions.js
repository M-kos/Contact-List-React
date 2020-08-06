export function authRequestOptions(name, password) {
  return {
    url: '/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      name,
      password,
    },
  }
}