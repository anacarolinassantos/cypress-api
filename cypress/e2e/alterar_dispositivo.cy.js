/// <reference types="cypress"/>
describe("Alterar Dispositivo", () => {
  const cadastrar_dispositivo = require("../fixtures/novo-dispositivo.json");
  const alterar_dispositivo = require("../fixtures/update-dispositivo.json");
  it("Alterar Dispositivo", () => {
    cy.request({
      method: "POST",
      url: `/objects`,
      failOnStatusCode: false,
      body: cadastrar_dispositivo,
    }).as("postDeviceResult");

    // pegando o result do cadastro para pegar o Id
    cy.get("@postDeviceResult").then((response_post) => {
      expect(response_post.status).equal(200);
      expect(response_post.body.name).equal(cadastrar_dispositivo.name);

      cy.request({
        method: "PUT",
        url: `/objects/${response_post.body.id}`,
        failOnStatusCode: false,
        body: alterar_dispositivo,
      }).as("putDeviceResult");

      // validações do PUT
      cy.get("@putDeviceResult").then((response_del) => {
        expect(response_del.status).to.eql(200);
        expect(response_del.body.name).equal(alterar_dispositivo.name);
      });
    });
  });
});
