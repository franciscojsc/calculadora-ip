"use strict";

const $form = document.querySelector("form");

const $ip = document.getElementById("ip");
const $mascara = document.getElementById("mascara");
const $mascaraCIDR = document.getElementById("mascaraCIDR");

$form.addEventListener("submit", function(e) {
  e.preventDefault();
  try {
    if (!!$mascaraCIDR.value) {
      $mascara.value = notacaoCIDR($mascaraCIDR.value);
    }
    const classe = verificarClasse($ip.value);
    const mascara = verificarMascara($mascara.value, classe);
    const rede = verificarRede($ip.value, $mascara.value);
    const broadcast = verificarBroadcast($ip.value, $mascara.value);
    const host = verificarHost($mascara.value);
    const subrede = verificarSubrede(classe, $mascara.value);

    limparCampos();

    /* section result */
      
    const $secaoDeEntrada = document.querySelector('section');
    $secaoDeEntrada.insertAdjacentHTML('afterend', `<section class="result"></section>`);
     
    /* card */

    const $secaoResultado = document.querySelector('.result');

    $secaoResultado.insertAdjacentHTML('beforeend', `
    <div class="card">
      <p>Classe</p>
      <p>${classe}</p>
    </div>`);
    
    $secaoResultado.insertAdjacentHTML('beforeend', `
    <div class="card">
      <p>IP</p>
      <p>${$ip.value}</p>
      <p>${converterDecimalParaBinarioQuatroOctetos($ip.value)}</p>
    </div>`);

    $secaoResultado.insertAdjacentHTML('beforeend', `
    <div class="card">
      <p>Máscara</p>
      <p>${$mascara.value}</p>
      <p>${converterDecimalParaBinarioQuatroOctetos($mascara.value)}</p>
    </div>`);

    $secaoResultado.insertAdjacentHTML('beforeend', `
    <div class="card">
      <p>Endereço de Rede</p>
      <p>${rede}</p>
      <p>${converterDecimalParaBinarioQuatroOctetos(rede)}</p>
    </div>`);

    $secaoResultado.insertAdjacentHTML('beforeend', `
    <div class="card">
      <p>Endereço de Broadcast</p>
      <p>${broadcast}</p>
      <p>${converterDecimalParaBinarioQuatroOctetos(broadcast)}</p>
    </div>`);

    $secaoResultado.insertAdjacentHTML('beforeend', `
    <div class="card">
      <p>Quantidade de rede/sub-rede</p>
      <p>${subrede}</p>
    </div>`);

    $secaoResultado.insertAdjacentHTML('beforeend', `
    <div class="card">
      <p>Quantidade de host por rede/sub-rede</p>
      <p>${host}</p>
    </div>`);
        
  } catch (error) {
    limparCampos();
    alert("ERRO: Verifique os valores inseridos");
  }
});

function limparCampos(){
  document.querySelector('.result') ? document.querySelector('.result').remove() : "";
}