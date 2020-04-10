"use strict";

const $form = document.querySelector("form");

const $resultClasse = document.getElementById("resultadoClasse");
const $resultIP = document.getElementById("resultadoIP");
const $resultMascara = document.getElementById("resultadoMascara");
const $resultRede = document.getElementById("resultadoRede");
const $resultBroadcast = document.getElementById("resultadoBroadcast");
const $resultQtdRede = document.getElementById("resultadoQtdRede");
const $resultQtdHost = document.getElementById("resultadoQtdHost");

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

    if (mascara === true) {
      $resultClasse.innerHTML = `
      <div class="card">
        <p>Classe</p>
        <p>${classe}</p>
      </div>`;
      
      $resultIP.innerHTML = `
      <div class="card">
        <p>IP</p>
        <p>${$ip.value}</p>
        <p>${converterDecimalParaBinarioQuatroOctetos($ip.value)}</p>
      </div>`;

      $resultMascara.innerHTML = `
      <div class="card">
        <p>Máscara</p>
        <p>${$mascara.value}</p>
        <p>${converterDecimalParaBinarioQuatroOctetos($mascara.value)}</p>
      </div>`;

      $resultRede.innerHTML = `
      <div class="card">
        <p>Endereço de Rede</p>
        <p>${rede}</p>
        <p>${converterDecimalParaBinarioQuatroOctetos(rede)}</p>
      </div>`;

      $resultBroadcast.innerHTML = `
      <div class="card">
        <p>Endereço de Broadcast</p>
        <p>${broadcast}</p>
        <p>${converterDecimalParaBinarioQuatroOctetos(broadcast)}</p>
      </div>`;

      $resultQtdRede.innerHTML = `
      <div class="card">
        <p>Quantidade de rede/sub-rede</p>
        <p>${subrede}</p>
      </div>`;

      $resultQtdHost.innerHTML = `
      <div class="card">
        <p>Quantidade de host por rede/sub-rede</p>
        <p>${host}</p>
      </div>`;
        
    } else {
      const $resultClasse = document.getElementById("resultadoClasse");
      $resultClasse.innerHTML = "<div class='card'><p style='color:red' >Verifique a máscara</p></div>";
    }
  } catch (error) {
    console.log(error);
  }
});
