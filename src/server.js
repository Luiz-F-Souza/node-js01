import http from "node:http"
import { json } from "./middlewares/json.js"
import { routes } from "./routes.js"




const server = http.createServer(async (req, res) => {


  await json(req, res)

  const route = routes.find( route => {
    return route.method === req.method && route.path === req.url
  })

  if(route) return route.handler(req, res)

  return  res.end("hello wooorld")

  
})






server.listen(3333)

