// o porque dp nome middlewares :  e um interceptador na mais e do que uma função que vai interceptar nossa requisição 
// e o conceito envolvido:



export async function json(req,res) {
    const buffers =[] 

    for await (const chunk of req){ 
      buffers.push(chunk)
    }
     
    try{
      req.body = JSON.parse(Buffer.concat(buffers).toString())
    }catch{
      req.body  = null
    }
    res.setHeader('Content-Type', 'application/json');
}