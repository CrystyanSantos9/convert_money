const express = require('express')

const app = express()

//lida com os paths se windows /xx/ se linux etc\xx\
const path = require('path')

//configurando view engine
app.set('view engine','ejs')

//Diretório da view
app.set('views',path.join(__dirname,'views'))
//arquivos estáticos publicos
app.use(express.static(path.join(__dirname,'public')))



app.listen(3000,err=>{
    console.log(err)
})

//criando rotas com os methodos
app.get('/',(req,res)=>{
    res.send({Mensagem:'Bem vindo'})
})

//criando rota com renderização
app.get('/home',(req,res)=>{
 res.render('home',{name:'Crystyan'})   
})