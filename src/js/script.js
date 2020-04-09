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
      $resultClasse.innerHTML = `<hr /><h5>Classe</h5><h5>${classe}</h5>`;
      $resultIP.innerHTML = `<hr /><h5>IP</h5><h5>${
        $ip.value
      }</h5><h5>${converterDecimalParaBinarioQuatroOctetos($ip.value)}</h5>`;
      $resultMascara.innerHTML = `<hr /><h5>Máscara</h5><h5>${
        $mascara.value
      }</h5><h5>${converterDecimalParaBinarioQuatroOctetos(
        $mascara.value
      )}</h5>`;
      $resultRede.innerHTML = `<hr /><h5>Endereço de Rede</h5><h5>${rede}</h5><h5>${converterDecimalParaBinarioQuatroOctetos(
        rede
      )}</h5>`;
      $resultBroadcast.innerHTML = `<hr /><h5>Endereço de Broadcast</h5><h5>${broadcast}</h5><h5>${converterDecimalParaBinarioQuatroOctetos(
        broadcast
      )}</h5>`;
      $resultQtdRede.innerHTML = `<hr /><h5>Quantidade de rede/sub-rede</h5><h5>${subrede}</h5>`;
      $resultQtdHost.innerHTML = `<hr /><h5>Quantidade de host por rede/sub-rede</h5><h5>${host}</h5>`;
    } else {
      const $resultClasse = document.getElementById("resultadoClasse");
      $resultClasse.innerHTML =
        "<hr /><h3 style='color:red' >Verifique a máscara</h3>";
    }
  } catch (error) {
    console.log(error);
  }
});
