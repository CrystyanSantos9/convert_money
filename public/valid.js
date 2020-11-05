function moneyTextToFloat(text) {
    const cleanText = text.replace("R$ ", "").replace(",", ".")
    return parseFloat(cleanText)
}

function floatToText(value) {
    let text = (value < 1 ? "0" : "") + Math.floor(value * 100)
    text = "R$ " + text
    return text.substr(0, text.length - 2) + "," + text.substr(-2)
}

function floatToTextcotacao(value) {
    let text = (value < 1 ? "0" : "") + Math.floor(value * 100)
    text = "$ " + text
    return text.substr(0, text.length - 2) + "," + text.substr(-2)
}

function testaValor(value) {
    let testaValor = new RegExp('^[0-9]+\.?\[0-9]{0,2}?|\.?\d{1,2}$')

    if (testaValor.test(value)) {
        return "passed"
    } else {
        return "error"
    }
}

//primeiro input inicia com focus
let valorcotacao = document.getElementsByClassName('valor')[0]
valorcotacao.focus()

$(function(){
$(".enviar").attr("disabled",true)

$cotacao = false
$qtd = false

//alerta escondido
$(".alerta").hide()


$(".valor").blur(function (e) {
    let $alvo = e.target
    console.log($alvo)

    let $inputName = $($alvo).attr('name')
    console.log($inputName)

    //valor do target
    let $valor = $($alvo).val()

    if (testaValor($valor) !== "error" && $valor > 0) {
        if ($inputName == "cotacao") {
            $cotacao = true
            let $alerta_1=$(".alerta")[0]
            $($alerta_1).hide()

            console.log($cotacao)
        }
        if ($inputName == "quantidade") {
            $qtd = true
            let $alerta_2=$(".alerta")[1]
            $($alerta_2).hide()
            console.log($qtd)
        }
    }else{
        if ($inputName == "cotacao") {
            $cotacao = false
            let $alerta_1= $(".alerta")[0]
            $($alerta_1).show(3000)
            console.log($cotacao)
        }

        if ($inputName == "quantidade") {
           $qtd = false
           let $alerta_2= $(".alerta")[1]
           $($alerta_2).show(3000)
            console.log($qtd)
        }
        console.log("Falhou")

    }

    if ($cotacao === true && $qtd === true) {
        $(".enviar").attr("disabled", false)
    } else {
        $(".enviar").attr("disabled", true)
    }



})

})