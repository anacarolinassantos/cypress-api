Cypress.Commands.add("buscarDispositivoEspecifico", (id) => {
  cy.request({
    method: "GET",
    url: `/objects/${id}`,
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("cadastrarDispositivo", (body) => {
  cy.request({
    method: "POST",
    url: `/objects`,
    failOnStatusCode: false,
    body: body
  }).then((response) => {
    return response;
  });
});
