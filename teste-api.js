const axios = require('axios')


const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='10-30-2020'&$top=1&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao===`



axios.get(url)
     .then(res => console.log(res.data.value[0].cotacaoVenda))
     .catch(err => console.log(err))
