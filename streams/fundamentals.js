
// streams 

//process.stdin // proceesso de leitura 
 // .pipe(process.stdout) // processo de saida 


 // criando uma streams do total zerro de leitura de scrita e transformação para transforma os dados 

 // steam de leitura tem o proposito de fornecer os dados , enviar imformação
 import {Readable, Writable,Transform} from 'node:stream' // sempre começa importando de dentro do node:stream o primeiro tipo de streams readable
 
 // aqui vamos cria uma calss da nossa streams 
 class OneToHundredStream extends Readable{
   // lembrando que essa streams nao pode receber stringe e numeros interios 
   // a streams de leitura  ela tem o proprosito de enviar  e receber dados 
   index =1
   _read(){ // este metodo ele vai  retornas todos os dados que estao dentro dessa strems 
     const i = this.index++
     setTimeout(()=>{
       if (i>100){
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
 
 // steam de escrita e transformação 
 // criando a primera stream de escrita 
 
 // ela e uma stream que vai receber dados  de um stream ded leitura  e vai fazer algo com esses dados 
 class MultiplyByStream extends Writable{
   // o que ela vai fazer 
      // ela vai pegar um  numero de uma stream de leitura e vai multiplica por dez 
   _write(chunk,encoding,callback){  // este metodo write vai receber terz paramneto 
     // chunk e o pedaço que a gente leu da string de leitura 
     // callback e uma função  de escrita precisa chamar quanto ela  terminou de fazer com aquela imformação 
     console.log(Number(chunk.toString()) *10)  // aqui dentro de um stream de escrito ela nao retorna nada ,  ela processa os dado 
     callback()  // vai encerrar depois que eu peguei toda a informação 
   }
 
 }
 
 
 // criando uma stream de transformação 
 class InverseNumberStream extends Transform{
   _transform(chunk,encoding,callback){ // recebe os mesmo dados 
     const transformed = Number(chunk.toString()) * -1
 
     callback(null,Buffer.from(String(transformed)))
 
   }
 }   // Serve para transforma o dado em outro 
  
 new OneToHundredStream()  // aqui esta tentando ler essas steamr 
 .pipe (new InverseNumberStream()) // a estrem de transformação ela precisa ler dados de lugar e escrever dados em algum lugar 
  .pipe(new MultiplyByStream()) // e aqui ja vai escrevendo no terminal 
 
 
 
 
 