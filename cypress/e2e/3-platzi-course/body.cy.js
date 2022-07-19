describe("Validando el body", function () {
  it("Probar el body", function () {
    cy.request("employees/10")
      .its("body")
      .its("first_name")
      .should("be.equal", "Homere");

    cy.request("employees/17").then((response) => {
      expect(response.status).to.be.equal(200);
      expect(response.headers["content-type"]).to.be.equal(
        "application/json; charset=utf-8"
      );
      expect(response.body.first_name).to.be.equal("Brandais");
      expect(response.body.email).to.be.equal("bchattg@delicious.com");
    });
  });
});
