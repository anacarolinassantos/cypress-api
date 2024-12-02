/// <reference types="cypress"/>
describe("Buscar Dispositivo", () => {
  it("Buscar Dispositivo especifico", () => {
    cy.buscarDispositivoEspecifico("12").then((response) => {
      expect(response.status).equal(200);
      expect(response.body.name).equal("Apple iPad Air");
    });
  });

  it("Buscar Todos Dispositivo", () => {
    cy.request({
      method: "GET",
      url: "/objects/",
    }).then((response) => {
      expect(response.status).to.eql(200);
      expect(response.body).to.have.length(13);

      response.body.array.forEach((element) => {
        expect(element.id).to.not.be.empty;
        expect(element.name).to.not.be.empty;
        expect(element).have.property("data");
      });
    });
  });

  it("Buscar Dispositivo inexistente", () => {
    const id = "92310";

    cy.buscarDispositivoEspecifico(id).then((response) => {
      expect(response.status).to.equal(404);
      expect(response.body.error).equal(`Oject with id=${id} was not found.`);
    });
  });
});
