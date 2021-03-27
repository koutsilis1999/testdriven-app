it("should display the page correctly if a user is not logged in", () => {
  cy.visit("/")
    .get(".navbar-burger")
    .click()
    .get("a")
    .not("User Status")
    .get("a")
    .not("Log Out")
    .get("a")
    .contains("Register")
    .get("a")
    .contains("Log In")
    .get("a")
    .contains("Swagger")
    .not(".notification.is-success");
});
