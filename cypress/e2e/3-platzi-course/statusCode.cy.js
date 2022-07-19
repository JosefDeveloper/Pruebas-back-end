describe("Probando statuses", () => {
  it("Debe validar el status code exitoso", function () {
    cy.request("employees").its("status").should("eq", 200);
  });

  it.only("Debe validar el status code fallido", function () {
    cy.request({ url: "employees/26", failOnStatusCode: false })
      .its("status")
      .should("eq", 404);
  });
});
