describe("Probando requests", function () {
  it("Debe crear un empleado", function () {
    cy.request({
      url: "employees",
      method: "POST",
      body: {
        first_name: "Gianluca",
        last_name: "Lapadula",
        email: "goat@yahoo.com",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("id");

      const id = response.body.id;
      cy.wrap(id).as("id");
    });
  });

  it("Debe validar que se haya registrado en la base de datos", function () {
    cy.request("employees").then((response) => {
      expect(response.body[response.body.length - 1].last_name).to.eq(
        "Lapadula"
      );
    });
  });

  it("Debe modificar al empleado con un nuevo correo", function () {
    cy.request({
      url: `employees/${this.id}`,
      method: "PUT",
      body: {
        first_name: "Gianluca",
        last_name: "Lapagol 🇵🇪",
        email: "lapagol@fpf.com",
      },
    }).then((response) => {
      cy.log(response);
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id");
    });
  });

  it("Debe borrar el registro", function () {
    cy.request({
      url: `employees/${this.id}`,
      method: "DELETE",
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
