//  aprendendo como as streasm se conectar com o servidor http do node 

// importando o http 
import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform{
  _transform(chunk,encoding,callback){ // recebe os mesmo dados 
    const transformed = Number(chunk.toString()) * -1

    console.log(transformed)

    callback(null,Buffer.from(String(transformed)))

  }
}  

// req => ReadebleStream
// res => writableStream

// criando o servido   que receber o req e res  req: senndo tudo que a gente pode receber de dados da rquisição res: o que a gente vai devolver de resposta   
const server = http.createServer(async(req,res) =>{
  //  emm alguns caso na minha aplicação  ler todos os dadaos da stream antes de processa esses dados 
  const buffers =[] //criação do array de buffer  que sao os pedaço que vamos receber das estream 

  for await (const chunk of req){ // sintaxe ela me permite corrre da pedaço da stream  e adiciona cada pedaço no array de buffers 
    buffers.push(chunk)
  }
  // depois disso eu quero ver o conteudo por completo 
  const fullStreamContent = buffers.concat(buffers).toString() // que serve para eu unir varios pedacinho em varios pedaço 

  console.log(fullStreamContent)

  return res.end(fullStreamContent)
})
server.listen(3334) // vai ouvir  a porta 3334
