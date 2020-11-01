const express = require('express')
const app = express()


//lida com os paths se windows /xx/ se linux etc\xx\
const path = require('path')

//configurando view engine
app.set('view engine', 'ejs')

//importando nosso código
const convert = require('./lib/convert')

//importanto bcbAPI
const apiBCB = require('./lib/api.bcb')

//Diretório da view
app.set('views', path.join(__dirname, 'views'))
//arquivos estáticos publicos
app.use(express.static(path.join(__dirname, 'public')))



app.listen(3000, err => {
    console.log(err)
})

//criando rotas com os methodos
app.get('/', async (req, res) => {
    const cotacao = await apiBCB.getCotacao()
    res.render('home',{
      cotacao  
    })
})

// criando rota com renderização
// app.get('/home', (req, res) => {
//     res.render('home')
// })

//criando a rota cotacao
app.get('/cotacao', (req, res) => {
    //usando destruction assigment para extrair valor 
    const { cotacao, quantidade } = req.query

    //se valor existir
    if (cotacao && quantidade) {
        const conversao = convert.convert(cotacao, quantidade)
        res.render('cotacao', {
            error: false,
            cotacao: convert.toMoney(cotacao),
            quantidade: convert.toMoney(quantidade),
            conversao: convert.toMoney(conversao),
        })
    } else {
        res.render('cotacao', {
            error: 'Valores inválidos'
        })
    }


})