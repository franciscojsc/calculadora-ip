'use strict'

function separarOcteto(decimal) {
    return decimal.split(".");
}

//verificar se está faltando digitos para completa o octeto
function verificarOcteto(octeto) {
    let octetoAux = new String(octeto);

    const diferenca = Math.abs(octetoAux.length - 8);

    if (octetoAux.length < 8) {
        for (let i = 0; i < diferenca; i++) {
            octetoAux = "0" + octetoAux;
        }
    }
    return octetoAux;
}

//verificar a classe ip, mas precisa da forma binária
function verificarClasseIp(primeiroOcteto) {
    const aux = new String(primeiroOcteto);

    if (aux.slice(0, 1) == "0") {
        return "A";
    } else if (aux.slice(0, 2) == "10") {
        return "B";
    } else if (aux.slice(0, 3) == "110") {
        return "C";
    } else if (aux.slice(0, 4) == "1110") {
        return "D";
    } else if (aux.slice(0, 5) == "1111") {
        return "E";
    }
}

function unir(octeto1, octeto2, octeto3, octeto4) {
    return new String(octeto1 + "." + octeto2 + "." + octeto3 + "." + octeto4);
}

function verificarRede(ip, mascara) {
    let rede = new String();

    for (let i = 0; i < 35; i++) {
        //operção AND entre ip e máscara
        if (ip.charAt(i) == '1' && mascara.charAt(i) == '1') {
            rede += "1"
        } else if ((ip.charAt(i) == '0' && mascara.charAt(i) == '1') || (ip.charAt(i) == '1' && mascara.charAt(i) == '0') || (ip.charAt(i) == '0' && mascara.charAt(i) == '0')) {
            rede += "0"
        } else {
            rede += "."
        }
    }

    return rede;
}

function verificarBroadcast(ip, mascara) {
    let notMascara = new String();

    for (let i = 0; i < 35; i++) {
        //operção NOT na máscara
        if (mascara.charAt(i) == '1') {
            notMascara += "0"
        } else if (mascara.charAt(i) == '0') {
            notMascara += "1"
        } else {
            notMascara += "."
        }
    }

    let broadcast = new String();

    for (let i = 0; i < 35; i++) {
        //operção OR entre ip e o not da máscara
        if ((notMascara.charAt(i) == '1' && ip.charAt(i) == '1') || (notMascara.charAt(i) == '0' && ip.charAt(i) == '1') || (notMascara.charAt(i) == '1' && ip.charAt(i) == '0')) {
            broadcast += "1"
        } else if ((notMascara.charAt(i) == '0' && ip.charAt(i) == '0')) {
            broadcast += "0"
        } else {
            broadcast += "."
        }
    }

    return broadcast;
}

function notacaoCIDR(mascara) {
    // exemplo /24

    let mascaraCIDR = new String();

    if (verificarNotacaoCIDR(mascara)) {
        for (let i = 0; i < 35; i++) {
            if (i == 8 || i == 17 || i == 26) {
                mascaraCIDR += ".";
                continue;
            }
            if (mascara != 0) {
                mascaraCIDR += "1";
                mascara--;
            } else if (i > mascara) {
                mascaraCIDR += "0";
            }
        }
        return mascaraCIDR;
    }

    return "cidr error"
}

function verificarNotacaoCIDR(mascara) {
    if (mascara > 0 && mascara <= 32) {
        return true;
    }
    return false;
}

function calcularSubrede(ip, mascara) {
    switch (verificarClasseIp(ip)) {
        case 'A':
            return new Number(Math.pow(2, Math.abs(8 - qtdBitsLigado(mascara))));
        case 'B':
            return new Number(Math.pow(2, Math.abs(16 - qtdBitsLigado(mascara))));
        case 'C':
            return new Number(Math.pow(2, Math.abs(24 - qtdBitsLigado(mascara))));
        default:
            break;
    }
}

function qtdBitsLigado(mascara) {
    let aux = 0;

    for (let i = 0; i < 35; i++) {
        if (mascara[i] == 1) {
            aux++;
        }
    }
    return aux;
}

function calcularHost(mascara) {
    return new Number(Math.pow(2, qtdBitsDesligado(mascara)) - 2);
}

function qtdBitsDesligado(mascara) {
    let aux = 0;

    for (let i = 0; i < 35; i++) {
        if (mascara[i] == 0) {
            aux++;
        }
    }
    return aux;
}

function validarIp(ip, ipbase10) {

    const regExp = /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/;

    if (regExp.test(ip)) {
        if (ipbase10[0] == 0) {
            return false;
        } else
        if (((ipbase10[0] > 0) && (ipbase10[0] <= 255) &&
                (ipbase10[1] >= 0) && (ipbase10[1] <= 255)) &&
            ((ipbase10[2] >= 0) && (ipbase10[2] <= 255) &&
                (ipbase10[3] >= 0) && (ipbase10[3] <= 255))) {
            return true;
        } else {
            return false;
        }
    } else {
        console.log("Ip inválido!!!")
        return false;
    }
}

function validarMascara(octeto1IP, mascara) {
    const regExp = /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/;

    if (regExp.test(unir(mascara[0], mascara[1], mascara[2], mascara[3]))) {
        switch (verificarClasseIp(octeto1IP)) {
            case 'A':

                if (mascara[0] != "255") {
                    console.log("Máscara inválida!!!")
                    return false;
                } else if ((mascara[1] >= 0 && mascara[1] <= 255) && (mascara[2] == '0' && mascara[3] == '0')) {
                    console.log("Máscara válida!!!")
                    return true;
                } else if ((mascara[1] == 255 && (mascara[2] >= 0 && mascara[2] <= 255)) && mascara[3] == 0) {
                    console.log("Máscara válida!!!");
                    return true;
                } else if ((mascara[1] == 255 && mascara[2] == 255) && (mascara[3] >= 0 && mascara[3] <= 255)) {
                    console.log("Máscara válida!!!");
                    return true;
                } else {
                    console.log("Máscara invalida!!!")
                    return false;
                }
                case 'B':
                    if ((mascara[0] != "255") || (mascara[1] != "255")) {
                        console.log("Máscara invalida!!!")
                        return false;
                    } else if ((mascara[2] >= "0" && mascara[2] <= "255") && mascara[3] == 0) {
                        console.log("Máscara válida!!!")
                        return true;
                    } else if (mascara[2] == "255" && (mascara[3] >= 0 && mascara[3] <= 255)) {
                        console.log("Máscara válida!!!")
                        return true;
                    } else {
                        console.log("Máscara inválida!!!")
                        return false;
                    }
                    case 'C':
                        if (((mascara[0] != "255") || (mascara[1] != "255")) || (mascara[2] != "255")) {
                            console.log("Máscara invalida!!!")
                            return false;
                        } else if (mascara[3] >= 0 && mascara[3] <= 255) {
                            console.log("Máscara válida!!!")
                            return true;
                        }
                        case 'D':
                            console.log("IP para Multicast")
                            return false;
                        case 'E':
                            console.log("Reservada a testes pela IETF")
                            return false;
                        default:
                            console.log("Error!!!")
                            return false;
        }
    } else {
        console.log("Máscara inválida!!!");
        return false;
    }

}

function converteDecimal(binario) {
    const binarioSeparado = separarOcteto(binario);
    const decimal = new Array();

    for (let i = 0; i < binarioSeparado.length; i++) {
        decimal.push(parseInt(binarioSeparado[i], 2).toString());
    }
    return unir(decimal[0], decimal[1], decimal[2], decimal[3]);
}

//const ip = "192.168.64.1";
//const mascara = "255.255.255.0";
//const cidr = "24"

// ----- Campos do index.html -----
const botao = document.getElementById("botao");
const resultado = document.getElementById("resultado")
// --------------------------------

botao.onclick = function () {
    // ----- Campos do index.html -----
    const ip = document.getElementById("ip").value;
    const mascara = document.getElementById("mascara").value;
    const cidr = document.getElementById("mascaraCIDR").value;
    // --------------------------------

    if (!mascara) {
        mascara = converteDecimal(notacaoCIDR(cidr));
    }

    const ipDecimal = separarOcteto(ip);
    const mascaraDecimal = separarOcteto(mascara);

    // converte ip em binário 
    const octeto1ip = verificarOcteto(parseInt(ipDecimal[0]).toString(2));
    const octeto2ip = verificarOcteto(parseInt(ipDecimal[1]).toString(2));
    const octeto3ip = verificarOcteto(parseInt(ipDecimal[2]).toString(2));
    const octeto4ip = verificarOcteto(parseInt(ipDecimal[3]).toString(2));

    // converte máscara em binário 
    const octeto1mascara = verificarOcteto(parseInt(mascaraDecimal[0]).toString(2));
    const octeto2mascara = verificarOcteto(parseInt(mascaraDecimal[1]).toString(2));
    const octeto3mascara = verificarOcteto(parseInt(mascaraDecimal[2]).toString(2));
    const octeto4mascara = verificarOcteto(parseInt(mascaraDecimal[3]).toString(2));

    const ipBinario = unir(octeto1ip, octeto2ip, octeto3ip, octeto4ip);
    const mascaraBinario = unir(octeto1mascara, octeto2mascara, octeto3mascara, octeto4mascara);

    if (validarIp(ip, ipDecimal)) {
        if (validarMascara(octeto1ip, mascaraDecimal)) {

            const resultClasse = document.getElementById("resultadoClasse");
            const resultIP = document.getElementById("resultadoIP");
            const resultMascara = document.getElementById("resultadoMascara");
            const resultRede = document.getElementById("resultadoRede");
            const resultBroadcast = document.getElementById("resultadoBroadcast");
            const resultQtdRede = document.getElementById("resultadoQtdRede");
            const resultQtdHost = document.getElementById("resultadoQtdHost");

            resultClasse.innerHTML = "<hr /><h5>Classe IP</h5><h5>" + verificarClasseIp(octeto1ip) + "</h5>";
            resultIP.innerHTML = "<hr /><h5>Endereço IP</h5><h5>" + ip + "</h5><h5>" + ipBinario.toString() + "</h5>";
            resultMascara.innerHTML = "<hr /><h5>Máscara</h5><h5>" + mascara + "</h5><h5>" + mascaraBinario.toString() + "</h5>";
            resultRede.innerHTML = "<hr /><h5>Endereço de Rede</h5><h5>" + converteDecimal(verificarRede(ipBinario, mascaraBinario)).toString() + "</h5><h5>" + verificarRede(ipBinario, mascaraBinario) + "</h5>";
            resultBroadcast.innerHTML = "<hr /><h5>Endereço de Broadcast</h5><h5>" + converteDecimal(verificarBroadcast(ipBinario, mascaraBinario)).toString() + "</h5><h5>" + verificarBroadcast(ipBinario, mascaraBinario) + "</h5>";
            resultQtdRede.innerHTML = "<hr /><h5>Quantidade de rede/sub-rede</h5><h5>" + calcularSubrede(ipBinario, mascaraBinario).toString() + "</h5>";
            resultQtdHost.innerHTML = "<hr /><h5>Quantidade de host por rede/sub-rede</h5><h5>" + calcularHost(mascaraBinario).toString() + "</h5>";

        } else {
            const resultClasse = document.getElementById("resultadoClasse");
            resultClasse.innerHTML = "<hr /><h3 style='color:red' >Verifique a máscara</h3>";
        }
    } else {
        const resultClasse = document.getElementById("resultadoClasse");
        resultClasse.innerHTML = "<hr /><h3 style='color:red' >Verifique o IP</h3>";
    }

};