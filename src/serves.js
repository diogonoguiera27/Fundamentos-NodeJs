import http from "node:http" // modulo http importado 
import { json } from "./middlewares/json.js"
import { routes } from "./routes.js"
import { extractQueryParams } from "./utils/extract-query-params.js"

const server = http.createServer(async(req,res) =>{  // temos dois parametro req e res 
    // dentro do req : conseguimos obeter todas as informação  da requisição que esta chegando no servidor 
    
    const {method, url} =req
    
    await json(req,res)

    const route = routes.find(route => {
      return route.method == method && route.path.test(url)
    })

    if (route){
      const routeParams = req.url.match(route.path)
      
      
      const {query, ...params}= routeParams.groups
      req.params = params
      req.query = query ? extractQueryParams(query): {}
      return  route.handler(req,res)
    }

    // res: devolver uma respotar pra quem esta chamado esse servidor
  return res.writeHead(484).end()

})

server.listen(3333)  //  localhost:3333 , todas vez que ele acessa esse endereço ele cai na função creatserverp