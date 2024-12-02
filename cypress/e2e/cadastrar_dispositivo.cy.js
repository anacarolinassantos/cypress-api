/// <reference types="cypress"/>
import { Faker, pt_BR, en } from "@faker-js/faker";
import { generate } from "gerador-validador-cpf";

const faker = new Faker({
  locale: [pt_BR, en],
});

it("Cadastrar novos dispositivos", () => {
  const owner = faker.person.fullName();
  const price = faker.commerce.price({ min: 100, max: 1000 });
  const product = faker.commerce.product();
  const cpf = generate({ format: true });

  const data = {
    name: "Iphone 15",
    data: {
      owner: owner,
      cpf: cpf,
      price: price,
      "CPU model": "Mediatek 48",
      "Quantum Storage": "64GB",
    },
  };

  cy.cadastrarDispositivo(data).then((resultado) => {
    expect(resultado.status).to.equal(200);

    const id = resultado.body.id;

    cy.buscarDispositivoEspecifico(id).then((response) => {
      expect(response.status).to.equal(200);
      expect(resultado.body.name).to.equal("Iphone 15");
    });
  });
});
