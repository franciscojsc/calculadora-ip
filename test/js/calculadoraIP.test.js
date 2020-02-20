"use strict";

let expect = chai.expect;

describe("# Classe IP", function() {
  it("Deveria retorna a classe A", function() {
    expect(verificarClasse("0.0.0.0")).to.be.equal("A");
  });

  it("Deveria retorna a classe A", function() {
    expect(verificarClasse("127.255.255.255")).to.be.equal("A");
  });

  it("Deveria retorna a classe B", function() {
    expect(verificarClasse("128.0.0.0")).to.be.equal("B");
  });

  it("Deveria retorna a classe B", function() {
    expect(verificarClasse("191.255.255.255")).to.be.equal("B");
  });

  it("Deveria retorna a classe C", function() {
    expect(verificarClasse("192.0.0.0")).to.be.equal("C");
  });

  it("Deveria retorna a classe C", function() {
    expect(verificarClasse("223.255.255.255")).to.be.equal("C");
  });

  it("Deveria retorna a classe D", function() {
    expect(verificarClasse("224.0.0.0")).to.be.equal("D");
  });

  it("Deveria retorna a classe D", function() {
    expect(verificarClasse("239.255.255.255")).to.be.equal("D");
  });

  it("Deveria retorna a classe E", function() {
    expect(verificarClasse("240.0.0.0")).to.be.equal("E");
  });

  it("Deveria retorna a classe E", function() {
    expect(verificarClasse("247.255.255.255")).to.be.equal("E");
  });

  it("Deveria lança um erro se o parâmeto não for String", function() {
    expect(function() {
      verificarClasse(192);
    }).to.throw;
  });

  it("Deveria lança um erro se não hover parâmetro", function() {
    expect(function() {
      verificarClasse();
    }).to.throw;
  });

  it("Deveria lança um erro se passar no parâmetro uma String vazia", function() {
    expect(function() {
      verificarClasse(" ");
    }).to.throw;
  });

  it("Deveria retorna a classe se passar no parâmetro uma String com espaço no início ", function() {
    expect(verificarClasse(" 192.168.0.100")).to.be.equal("C");
  });

  it("Deveria retorna a classe se passar no parâmetro uma String com espaço no fim", function() {
    expect(verificarClasse("192.168.0.100 ")).to.be.equal("C");
  });

  it("Deveria lança um erro se passar no parâmetro uma String com espaço em qualquer local", function() {
    expect(function() {
      verificarClasse(" 19 2. 168. 0.100 ");
    }).to.throw;
  });

  it("Deveria lança um erro ao receber uma String sem pontos de separação", function() {
    expect(function() {
      verificarClasse("1921680100");
    }).to.throw;
  });

  it("Deveria lança um erro ao receber uma String com 1 ponto de separação", function() {
    expect(function() {
      verificarClasse("192.1680100");
    }).to.throw;
  });

  it("Deveria lança um erro ao receber uma String com 2 pontos de separação", function() {
    expect(function() {
      verificarClasse("192.168.0100");
    }).to.throw;
  });

  it("Deveria lança um erro ao receber uma String com 4 pontos de separação", function() {
    expect(function() {
      verificarClasse("192.168.0.100.0");
    }).to.throw;
  });

  it("Deveria lança um erro ao receber um IP com número maior que 255", function() {
    expect(function() {
      verificarClasse("192.300.0.100");
    }).to.throw;
  });

  it("Deveria lança um erro ao receber um IP com número maior que 3 casas decimais", function() {
    expect(function() {
      verificarClasse("192.1628.0.100");
    }).to.throw;
  });

  it("Deveria lança um erro ao receber um IP com letras", function() {
    expect(function() {
      verificarClasse("192.16A8.0.100");
    }).to.throw;
  });
});

describe("# Máscara IP", function() {
  it("Deveria lança um erro se o parâmeto não for String", function() {
    expect(function() {
      verificarMascara(255, "A");
    }).to.throw;
  });

  it("Deveria retorna false se não houver a classe ip nos parâmetro", function() {
    expect(verificarMascara("255.255.255.0")).to.be.false;
  });

  it("Deveria lança um erro se não hover parâmetro", function() {
    expect(function() {
      verificarMascara();
    }).to.to.throw;
  });

  it("Deveria lança um erro se passar no parâmetro uma String vazia", function() {
    expect(function() {
      verificarMascara(" ");
    }).to.throw;
  });

  it("Deveria retorna a true se passar no parâmetro uma String com espaço no início ", function() {
    expect(verificarMascara(" 255.255.255.0", "A")).to.be.true;
  });

  it("Deveria retorna true se passar no parâmetro uma String com espaço no fim", function() {
    expect(verificarMascara("255.255.255.0 ", "A")).to.be.true;
  });

  it("Deveria retorna false se passar no parâmetro máscara incorreta", function() {
    expect(verificarMascara("255.0.255.0", "A")).to.be.false;
    expect(verificarMascara("255.0.0.255", "A")).to.be.false;
    expect(verificarMascara("255.255.0.255", "A")).to.be.false;
    expect(verificarMascara("0.255.0.255", "A")).to.be.false;
    expect(verificarMascara("0.0.0.255", "A")).to.be.false;
    expect(verificarMascara("0.0.0.255", "A")).to.be.false;
    expect(verificarMascara("0.10.0.255", "A")).to.be.false;
    expect(verificarMascara("255.15.0.255", "A")).to.be.false;
    expect(verificarMascara("0.0.0.255", "A")).to.be.false;
  });

  it("Deveria retorna true se passar no parâmetro uma máscara correta para a classe A", function() {
    expect(verificarMascara("255.0.0.0", "A")).to.be.true;
    expect(verificarMascara("255.255.0.0", "A")).to.be.true;
    expect(verificarMascara("255.255.255.0", "A")).to.be.true;
  });

  it("Deveria retorna false se passar no parâmetro uma máscara incorreta para a classe A", function() {
    expect(verificarMascara("0.0.0.0", "A")).to.be.false;
  });

  it("Deveria retorna true se passar no parâmetro uma máscara correta para a classe B", function() {
    expect(verificarMascara("255.255.0.0", "B")).to.be.true;
    expect(verificarMascara("255.255.255.0", "B")).to.be.true;
  });

  it("Deveria retorna false se passar no parâmetro uma máscara incorreta para a classe B", function() {
    expect(verificarMascara("0.0.0.0", "B")).to.be.false;
    expect(verificarMascara("255.0.0.0", "B")).to.be.false;
  });

  it("Deveria retorna true se passar no parâmetro uma máscara correta e a classe C", function() {
    expect(verificarMascara("255.255.255.0", "C")).to.be.true;
  });

  it("Deveria retorna false se passar no parâmetro uma máscara incorreta para a classe C", function() {
    expect(verificarMascara("0.0.0.0", "C")).to.be.false;
    expect(verificarMascara("255.0.0.0", "C")).to.be.false;
    expect(verificarMascara("255.255.0.0", "C")).to.be.false;
  });

  it("Deveria retorna um erro se passar no parâmetro uma String com espaço em qualquer local", function() {
    expect(function() {
      verificarMascara(" 25 5. 255. 0.255 ", "A");
    }).to.throw;
  });

  it("Deveria retorna um erro ao receber uma String sem pontos de separação", function() {
    expect(function() {
      verificarMascara("2552552550", "A");
    }).to.throw;
  });

  it("Deveria lança um erro ao receber uma String com 1 ponto de separação", function() {
    expect(function() {
      verificarMascara("255.25500", "A");
    }).to.throw;
  });

  it("Deveria lança um erro ao receber uma String com 2 pontos de separação", function() {
    expect(function() {
      verificarMascara("255.255.00", "A");
    }).to.throw;
  });

  it("Deveria lança um erro ao receber uma String com 4 pontos de separação", function() {
    expect(function() {
      verificarMascara("255.255.255.0.0", "A");
    }).to.throw;
  });

  it("Deveria lança um erro ao receber uma máscara com número maior que 255", function() {
    expect(function() {
      verificarMascara("255.255.256.0", "A");
    }).to.throw;
  });

  it("Deveria lança um erro ao receber uma máscara com número maior que 3 casas decimais", function() {
    expect(function() {
      verificarMascara("255.2555.0.0", "A");
    }).to.throw;
  });

  it("Deveria lança um erro ao receber uma máscara com letras", function() {
    expect(function() {
      verificarMascara("255.25A5.255.0", "A");
    }).to.throw;
  });
});

describe("# Rede IP", function() {
  it("Deveria retorna a rede do IP classe A", function() {
    expect(verificarRede("10.10.1.8", "255.0.0.0")).to.be.equal("10.0.0.0");
  });
  it("Deveria retorna a rede do IP classe B", function() {
    expect(verificarRede("165.0.10.80", "255.255.0.0")).to.be.equal(
      "165.0.0.0"
    );
  });
  it("Deveria retorna a rede do IP classe C", function() {
    expect(verificarRede("192.168.0.100", "255.255.255.0")).to.be.equal(
      "192.168.0.0"
    );
  });
});

describe("# Broadcast IP", function() {
  it("Deveria retorna o Broadcast classe A", function() {
    expect(verificarBroadcast("10.10.1.8", "255.0.0.0")).to.be.equal(
      "10.255.255.255"
    );
  });
  it("Deveria retorna o Broadcast classe B", function() {
    expect(verificarBroadcast("165.0.10.80", "255.255.0.0")).to.be.equal(
      "165.0.255.255"
    );
  });
  it("Deveria retorna o Broadcast classe C", function() {
    expect(verificarBroadcast("192.168.0.100", "255.255.255.0")).to.be.equal(
      "192.168.0.255"
    );
  });
});

describe("# Notação CIDR", function() {
  it("Deveria retorna a máscara 255.0.0.0", function() {
    expect(notacaoCIDR(8)).to.be.equal("255.0.0.0");
  });
  it("Deveria retorna a máscara 255.128.0.0", function() {
    expect(notacaoCIDR(9)).to.be.equal("255.128.0.0");
  });
  it("Deveria retorna a máscara 255.192.0.0", function() {
    expect(notacaoCIDR(10)).to.be.equal("255.192.0.0");
  });
  it("Deveria retorna a máscara 255.224.0.0", function() {
    expect(notacaoCIDR(11)).to.be.equal("255.224.0.0");
  });
  it("Deveria retorna a máscara 255.240.0.0", function() {
    expect(notacaoCIDR(12)).to.be.equal("255.240.0.0");
  });
  it("Deveria retorna a máscara 255.248.0.0", function() {
    expect(notacaoCIDR(13)).to.be.equal("255.248.0.0");
  });
  it("Deveria retorna a máscara 255.252.0.0", function() {
    expect(notacaoCIDR(14)).to.be.equal("255.252.0.0");
  });
  it("Deveria retorna a máscara 255.254.0.0", function() {
    expect(notacaoCIDR(15)).to.be.equal("255.254.0.0");
  });
  it("Deveria retorna a máscara 255.255.0.0", function() {
    expect(notacaoCIDR(16)).to.be.equal("255.255.0.0");
  });
  it("Deveria retorna a máscara 255.255.128.0", function() {
    expect(notacaoCIDR(17)).to.be.equal("255.255.128.0");
  });
  it("Deveria retorna a máscara 255.255.192.0", function() {
    expect(notacaoCIDR(18)).to.be.equal("255.255.192.0");
  });
  it("Deveria retorna a máscara 255.255.224.0", function() {
    expect(notacaoCIDR(19)).to.be.equal("255.255.224.0");
  });
  it("Deveria retorna a máscara 255.255.240.0", function() {
    expect(notacaoCIDR(20)).to.be.equal("255.255.240.0");
  });
  it("Deveria retorna a máscara 255.255.248.0", function() {
    expect(notacaoCIDR(21)).to.be.equal("255.255.248.0");
  });
  it("Deveria retorna a máscara 255.255.252.0", function() {
    expect(notacaoCIDR(22)).to.be.equal("255.255.252.0");
  });
  it("Deveria retorna a máscara 255.255.254.0", function() {
    expect(notacaoCIDR(23)).to.be.equal("255.255.254.0");
  });
  it("Deveria retorna a máscara 255.255.255.0", function() {
    expect(notacaoCIDR(24)).to.be.equal("255.255.255.0");
  });
  it("Deveria retorna a máscara 255.255.255.128", function() {
    expect(notacaoCIDR(25)).to.be.equal("255.255.255.128");
  });
  it("Deveria retorna a máscara 255.255.255.192", function() {
    expect(notacaoCIDR(26)).to.be.equal("255.255.255.192");
  });
  it("Deveria retorna a máscara 255.255.255.224", function() {
    expect(notacaoCIDR(27)).to.be.equal("255.255.255.224");
  });
  it("Deveria retorna a máscara 255.255.255.240", function() {
    expect(notacaoCIDR(28)).to.be.equal("255.255.255.240");
  });
  it("Deveria retorna a máscara 255.255.255.248", function() {
    expect(notacaoCIDR(29)).to.be.equal("255.255.255.248");
  });
  it("Deveria retorna a máscara 255.255.255.252", function() {
    expect(notacaoCIDR(30)).to.be.equal("255.255.255.252");
  });
});

describe("# Host", function() {
  it("Deveria retorna 16777214 hosts", function() {
    expect(verificarHost("255.0.0.0").valueOf()).to.be.equal(16777214);
  });
  it("Deveria retorna 8388606 hosts", function() {
    expect(verificarHost("255.128.0.0").valueOf()).to.be.equal(8388606);
  });
  it("Deveria retorna 4194302 hosts", function() {
    expect(verificarHost("255.192.0.0").valueOf()).to.be.equal(4194302);
  });
  it("Deveria retorna 2097150 hosts", function() {
    expect(verificarHost("255.224.0.0").valueOf()).to.be.equal(2097150);
  });
  it("Deveria retorna 1048574 hosts", function() {
    expect(verificarHost("255.240.0.0").valueOf()).to.be.equal(1048574);
  });
  it("Deveria retorna 524286 hosts", function() {
    expect(verificarHost("255.248.0.0").valueOf()).to.be.equal(524286);
  });
  it("Deveria retorna 262142 hosts", function() {
    expect(verificarHost("255.252.0.0").valueOf()).to.be.equal(262142);
  });
  it("Deveria retorna 131070 hosts", function() {
    expect(verificarHost("255.254.0.0").valueOf()).to.be.equal(131070);
  });
  it("Deveria retorna 65534 hosts", function() {
    expect(verificarHost("255.255.0.0").valueOf()).to.be.equal(65534);
  });
  it("Deveria retorna 32766 hosts", function() {
    expect(verificarHost("255.255.128.0").valueOf()).to.be.equal(32766);
  });
  it("Deveria retorna 16382 hosts", function() {
    expect(verificarHost("255.255.192.0").valueOf()).to.be.equal(16382);
  });
  it("Deveria retorna 8190 hosts", function() {
    expect(verificarHost("255.255.224.0").valueOf()).to.be.equal(8190);
  });
  it("Deveria retorna 4094 hosts", function() {
    expect(verificarHost("255.255.240.0").valueOf()).to.be.equal(4094);
  });
  it("Deveria retorna 2046 hosts", function() {
    expect(verificarHost("255.255.248.0").valueOf()).to.be.equal(2046);
  });
  it("Deveria retorna 1022 hosts", function() {
    expect(verificarHost("255.255.252.0").valueOf()).to.be.equal(1022);
  });
  it("Deveria retorna 510 hosts", function() {
    expect(verificarHost("255.255.254.0").valueOf()).to.be.equal(510);
  });
  it("Deveria retorna 254 hosts", function() {
    expect(verificarHost("255.255.255.0").valueOf()).to.be.equal(254);
  });
  it("Deveria retorna 126 hosts", function() {
    expect(verificarHost("255.255.255.128").valueOf()).to.be.equal(126);
  });
  it("Deveria retorna 62 hosts", function() {
    expect(verificarHost("255.255.255.192").valueOf()).to.be.equal(62);
  });
  it("Deveria retorna 30 hosts", function() {
    expect(verificarHost("255.255.255.224").valueOf()).to.be.equal(30);
  });
  it("Deveria retorna 14 hosts", function() {
    expect(verificarHost("255.255.255.240").valueOf()).to.be.equal(14);
  });
  it("Deveria retorna 6 hosts", function() {
    expect(verificarHost("255.255.255.248").valueOf()).to.be.equal(6);
  });
  it("Deveria retorna 2 hosts", function() {
    expect(verificarHost("255.255.255.252").valueOf()).to.be.equal(2);
  });
});

describe("# Subrede", function() {
  it("Deveria retornar 1 rede/sub-rede", function() {
    expect(verificarSubrede("A", "255.0.0.0")).to.be.equal(1);
  });
  it("Deveria retornar 256 rede/sub-rede", function() {
    expect(verificarSubrede("A", "255.255.0.0")).to.be.equal(256);
  });
  it("Deveria retornar 65536 rede/sub-rede", function() {
    expect(verificarSubrede("A", "255.255.255.0")).to.be.equal(65536);
  });
  it("Deveria retornar 1 rede/sub-rede", function() {
    expect(verificarSubrede("B", "255.255.0.0")).to.be.equal(1);
  });
  it("Deveria retornar 256 rede/sub-rede", function() {
    expect(verificarSubrede("B", "255.255.255.0")).to.be.equal(256);
  });
  it("Deveria retornar 1 rede/sub-rede", function() {
    expect(verificarSubrede("C", "255.255.255.0")).to.be.equal(1);
  });
});
