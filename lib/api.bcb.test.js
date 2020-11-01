const { TestScheduler } = require('jest')
const api = require('./api.bcb')
const axios = require('axios')

jest.mock('axios')

//valor que nossa api deve responder quando correto
test('getCotacaoAPI',()=>{
const res = {
    //res.data.value[0].cotacaoVenda
    data:{
        value:[
            {cotacaoVenda:3.90}
        ]
    }
}

//fixando a resposta do axios
axios.get.mockResolvedValue(res)
api.getCotacaoAPI('url').then(resp=>{
    expect(resp).toEqual(res)
    expect(axios.get.mock.calls[0][0]).toBe('url')
})
})

test('extractCotacao',()=>{
    const cotacao = api.extractCotacao({
        data:{
            value:[{cotacaoVenda:3.90}]
        }
    })
    expect(cotacao).toBe(3.90)
})

//describe para agrupar tests
describe('geToday',()=>{
    //fazendo uma copia do objeto global Date
    const RealDate = Date
    
    //travando a data com a data que eu estou passando
    function mockDate(date){
        global.Date = class extends RealDate {
            constructor(){
                return new RealDate(date)
            }
        }
    }
    //devolvendo o objeto global Date
    afterEach(()=>{
        global.Date = RealDate
    })

    test('getToday',()=>{
        //data no formato ISO
        mockDate('2019-01-01T12:00:00z')
        const today = api.getToday()
        expect(today).toBe('1-1-2019')
    })
})

test('getUrl',()=>{
    const url = api.getUrl('MINHA-URL')
    expect(url).toBe("https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='MINHA-URL'&$top=1&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao")
})

test('getCotacao',()=>{

    const res = {
      
    }

    const getToday = jest.fn()
    //fixando valor
    getToday.mockReturnValue('01-01-2019')

    const getUrl = jest.fn()
    getUrl.mockReturnValue('url')

    const getCotacaoAPI = jest.fn()
    getCotacaoAPI.mockReturnValue(Promise.reject('err'))

    const extractCotacao = jest.fn()
    extractCotacao.mockReturnValue(3.9)

    //chamando a funcao pura unitaria / () retorno de uma funcao 
    api.pure.getCotacao({getToday,getUrl, getCotacaoAPI,extractCotacao})()
        .then(res => {
            expect(res).toBe('')
        })


})