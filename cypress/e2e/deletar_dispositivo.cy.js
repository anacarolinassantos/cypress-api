/// <reference types="cypress"/>
describe("Deletar Dispositivo", () => {
  it("Deletar Dispositivo", () => {
    cy.request({
      method: "POST",
      url: `/objects`,
      failOnStatusCode: false,
      body: {
        name: "PC ANA",
        data: {
          year: 2010,
          price: 10,
          "CPU model": "Intel Core 19",
          "Hard disk size": "1 TB",
        },
      },
    }).as("postDeviceResult");

    // Pegando o result do cadastro para pegar o id
    cy.get("@postDeviceResult").then((response) => {
      expect(response.status).to.eql(200);

      cy.request({
        method: "DELETE",
        url: `/objects/${response.body.id}`,
        failOnStatusCode: false,
      }).as("deleteDeviceResult");

      //Validações do delete
      cy.get("@deleteDeviceResult").then((response_delete) => {
        expect(response_delete.status).to.eql(200);
        expect(response_delete.body.message).equal(
          `Object with id = ${response.body.id} has been deleted.`
        );
      });
    });
  });
});
