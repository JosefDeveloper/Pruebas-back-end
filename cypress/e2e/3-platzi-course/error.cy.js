describe("Probando errores", function () {
  it("Debe validar el status code fallido y el mensaje de error", function () {
    cy.request({
      url: "https://pokeapi.co/api/v2/4545",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.be.eq("Not Found");
    });
  });

  it("Debe validar el status code fallido y el mensaje de error 2", function () {
    cy.request({
      url: "https://rickandmortyapi.com/api/location/3434343",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.have.property("error", "Location not found");
    });
  });
});
