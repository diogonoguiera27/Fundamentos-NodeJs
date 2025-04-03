import { Database } from "./database.js"
import {randomUUID} from 'node:crypto'
import { buildRoutePath } from "./utils/build-route-path.js"

const database = new Database()

//  criasção de aaray de rotas onde vai ficar todas as rotas 
export const routes = [ // estrutura de um array de rotas
    {
        // vada rota vai ser um obejto elas sao compota por method , path handler: 
        method:'GET',
        path: buildRoutePath('/users'),
        handler: (req,res) =>{   // essa linha e uma função 
            console.log(req.query)
            const users = database.select('users', search ? {
                name:search,
                email:search,
            }: null)

            return res.end(JSON.stringify(users));
        }
    },
    {
        method:'POST',
        path: buildRoutePath('/users'),
        handler: (req,res) =>{   // essa linha e uma função 
            const { name,email} = req.body
            
            
            const user ={
            id: randomUUID(),
            name,
            email,
            }

            database.insert('users',user)

            return res.writeHead(201).end()
        }
    },
    {
        method:'PUT',
        path: buildRoutePath('/users/:id'),
        handler: (req,res)=>{
            const {id} = req.params
            const {name,email} = req.body

            database.update('users',id, {
                name,
                email,
            })

            return res.writeHead(204).end()
        },
    },
    // carição da rota de remoção e edição 
    {
        method:'DELETE',
        path: buildRoutePath('/users/:id'),
        handler: (req,res)=>{
            const {id} = req.params

            database.delete('users',id)
            return res.writeHead(204).end()
        },
    }
]