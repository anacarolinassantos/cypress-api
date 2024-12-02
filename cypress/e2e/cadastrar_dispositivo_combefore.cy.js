/// <reference types="cypress"/>
describe("Cadastrar Dispositivo", () => {
  let token;

  before(() => {
    cy.request({
      method: "POST",
      url: "/login",
      body: {
        email: "ana@ana.com.br",
        senha: "12345",
      },
    }).then((resultado) => {
      token = resultado.body.token;
    });
  });

  it("Cadastrar Dispositivo com sucesso", () => {
    cy.request({
      method: "POST",
      url: "https://api.restful-api.dev/objects",
      body: {
        name: "PC ANA",
        data: {
          year: 2010,
          price: 10,
          "CPU model": "Intel Core i9",
          "Hard disk size": "1 TB",
        },
      },
      headers: {
        Authorization: token,
      },
    }).then((resultado) => {
      expect(resultado.status).to.eql(200);
      expect(resultado.body.id).to.not.empty;
      expect(resultado.body.name).to.eql("PC ANA");
    });
  });
});
