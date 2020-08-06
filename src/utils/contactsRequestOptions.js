export function contactsRequestOptions(id, method, body) {
  let requestUrl = `/contacts?id=${id}`

  if (method === 'GET') {
    requestUrl = `/contacts?userId=${id}`
  }

  if (method === 'POST') {
    requestUrl = `/contacts`
  }

  if (method === 'DELETE') {
    requestUrl = `/contacts/${id}`
  }

  return {
    url: requestUrl,
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body
  }
}