export function contactsRequestOptions(id, method, body) {
  let requestUrl = ''

  switch (method) {
    case 'GET':
      requestUrl = `/contacts?userId=${id}`
      break;
    case 'POST':
      requestUrl = `/contacts`
      break;
    case 'DELETE':
    case 'PATCH':
      requestUrl = `/contacts/${id}`
      break;
    default:
      requestUrl = `/contacts?id=${id}`
      break;
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