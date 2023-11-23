/*let titulo = document.querySelector('h1');
titulo.innerHTML = 'Jogo do numero secreto';

let paragrafo = document.querySelector('p');
paragrafo.innerHTML = 'Escolha um numero entre 1 e 10';

Nao esta errado a forma em que foi escrito esse trecho do codigo
mas é importante lembrar que quanto menos codigo tiver, mas limpo 
e rapido sera o programa em que estiver trabalhando.
*/
//estou criando um array antes do numeor secreto, pq quando o 
//numero for sorteado, ele vai ser guardado nesta variavel

let listaDeNumeros = [];
let numeroLimite = 80;
let numeroSecreto = gerarNumeroSecreto();
let tentativas = 1;

function exibirTexto(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){
    exibirTexto('h1', 'Jogo do número secreto');
    exibirTexto('p', `Escolha um numero entre 1 e ${numeroLimite}`);
}

exibirMensagemInicial()

function verificarChute() {
    let chute = document.querySelector('input').value;
    //console.log(chute == numeroSecreto);

    if(chute == numeroSecreto){
        exibirTexto('h1', 'Acertou!');

        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}!`;

        exibirTexto('p', mensagemTentativa);

        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if(chute > numeroSecreto){
        exibirTexto('p', 'O número secreto é menor');
    }else{
        exibirTexto('p', 'O número secreto é maior');
    }
    //tentativas = tentativas +1;
    tentativas++;
    limparCampo();
}

function gerarNumeroSecreto(){
    // Crio uma condição para verificar se o numero ja foi escolhido
    // Caso tenha sido escolhido, gerar um novo numero aleatorio, caso
    // Contrario gerar numero secreto e coloque este numero na lista
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let qtdNumerosDaLista = listaDeNumeros.length;

    if(qtdNumerosDaLista == numeroLimite){
        listaDeNumeros = [];
    }


    if(listaDeNumeros.includes(numeroEscolhido)){
      return gerarNumeroSecreto();  
    }else{
        listaDeNumeros.push(numeroEscolhido);
        console.log(listaDeNumeros);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    location.reload();
    gerarNumeroSecreto();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}