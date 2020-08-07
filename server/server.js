const jsonServer = require('json-server')
const bodyParser = require('body-parser')
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
    const id = +req.headers.authorization
    const user = router.db.__wrapped__.users.filter(user => user.id === id)
    
    if (user && user.length) {
      req.user = user[0]
      next()
    } else {
      res.sendStatus(401)
    }
  }

  if (!req.headers.authorization && req.path === '/login' && req.method === 'POST') {
    const {name, password} = req.body
    const user = router.db.__wrapped__.users.filter(user => user.name === name && user.password === password)
    
    if (user && user.length) {
      req.user = user[0]
      next()
    } else {
      res.sendStatus(401)
    }
  }
}

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(isAuthorized)
server.post('/login', (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.json(req.user)
})
server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running')
})