// aqui vamos cria um upload fecticio uma requisiççao , como se fosse o frontand chamando o  servidor http   enviando aluma imformação pesada 
import {Readable} from 'node:stream'

class OneToHundredStream extends Readable{
  // lembrando que essa streams nao pode receber stringe e numeros interios 
  // a streams de leitura  ela tem o proprosito de enviar  e receber dados 
  index =1
  _read(){ // este metodo ele vai  retornas todos os dados que estao dentro dessa strems 
    const i = this.index++
    setTimeout(()=>{
      if (i > 5){
        this.push(null) // metodo que utilizamos para um stream  fornecer imformação pra quem esta consumindo ela 
      }else{
        const buf = Buffer.from(String(i)) // buffer naio aceitar numeros 

        this.push(buf) // isso daqui e chunk  e tudo que e enviado dentro desse tihs.push 
      }
    },1000)
   // o x da questao do node e que enquanto a aplicação esta rodadno  a gente consegui mostra os dado  antes de esta completo
   // vamos trabalhar pouco com isso no dia a dia so e  legal ter o entendimento
  }
}

// fetch Api serve para  fazer requisição de um endereço para outro  seja do front pro backande ou do backand pro banck
fetch('http://localhost:3334',{
    method:'post',   // uma stream na requisição htttp ela so pode ser enviada  se for metodo post ou put 
    body: new OneToHundredStream(), // body conteudo da requisição 
    duplex: 'half',
}).then(Response => {
    return Response.text()
}).then(data =>{
    console.log(data)
})
