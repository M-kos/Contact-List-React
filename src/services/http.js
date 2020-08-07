export class Http {
  static async request(options = {}) {
    try {
      const response = await fetch(options.url, {
        method: options.method || 'GET',
        headers: options.headers || {},
        body: options.body ?  JSON.stringify(options.body): null,
      })

      if (!response.ok) {
        throw new Error('Something went wrong')
      }

      const data = await response.json()

      return data
    } catch (error) {
      console.error(error.message || error)
      if(window.M) {
        window.M.toast({html: error.message || error, classes: 'red'})
      }
      throw new Error(error)
    }
  }
}