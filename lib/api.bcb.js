const axios = require('axios')

//passando data
const getUrl = (data) => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${data}'&$top=1&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`

//recebendo data e pondo em getUrl
const getCotacaoAPI = url => axios.get(url)
const extractCotacao = res => res.data.value[0].cotacaoVenda

//pegando data de hoje
const getToday = ()=>{
    const today=new Date()
    //retornanda mes+1 dia e ano completo 
    return today.getMonth()+1+'-'+today.getDate()+'-'+today.getFullYear()
}

//unindo as funcoes
const getCotacao = ({getToday, getUrl,getCotacaoAPI,extractCotacao}) => async() => {
    //uma promisse
    //tratando erros de forma simples
    try{
        const today = getToday()
        const url = getUrl(today)
        //console.log(today)
        const res = await getCotacaoAPI(url)
        const cotacao = extractCotacao(res)
        return cotacao
    }catch(err){
        return ''
    }
    
}



module.exports = {
    getCotacaoAPI,
    getCotacao: getCotacao({getToday, getUrl,getCotacaoAPI,extractCotacao}),
    extractCotacao,
    getToday,
    getUrl,
    pure:{
        getCotacao
    }
}