const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

function isAuthorized(req, res, next) {
  if (req.path === '/login' && req.method !== 'POST') {
    res.sendStatus(403)
  }

  if (!req.headers.authorization && req.path !== '/login') {
    res.sendStatus(401)
  }
  
  if (req.headers.authorization) {
    const searchedUser = req.headers.authorization.split(' ')
    
    const user = router.db.__wrapped__.users.filter(user => user.name === searchedUser[0] && user.password === searchedUser[1])
    
    if (user && user.length) {
      req.user = user[0]
      next()
    } else {
      res.sendStatus(401)
    }
  }
}

server.use(middlewares)
server.use(isAuthorized)
server.post('/login', (req, res) => {
  res.status(200).json(req.user)
})
server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running')
})