const randomstring = require("randomstring");

const username = randomstring.generate();
const email = `${username}@test.com`;
const password = 'greaterthanten';

describe("Login", () => {
  it("should allow a user to sign in", () => {
    // register user
    cy.visit("/register")
      .get('input[name="username"]')
      .type(username)
      .get('input[name="email"]')
      .type(email)
      .get('input[name="password"]')
      .type(password)
      .get('input[type="submit"]')
      .click();

    // log a user out
    cy.get(".navbar-burger").click();
    cy.contains("Log Out").click();

    // log a user in
    cy.get("a")
      .contains("Log In")
      .click()
      .get('input[name="email"]')
      .type(email)
      .get('input[name="password"]')
      .type(password)
      .get('input[type="submit"]')
      .click()
      .wait(100);

    // assert user is redirected to '/'
    // assert '/' is displayed properly
    cy.contains("All Users");
    cy.get("table").find("tbody > tr").last().find("td").contains(username);
    cy.get(".navbar-burger").click();
    cy.get(".navbar-menu").within(() => {
      cy.get(".navbar-item")
        .contains("User Status")
        .get(".navbar-item")
        .contains("Log Out")
        .get(".navbar-item")
        .not("Log In")
        .get(".navbar-item")
        .not("Register");
    });

    // log a user out
    cy.get(".navbar-burger").click();
    cy.get("a").contains("Log Out").click();

    // assert '/logout' is displayed properly
    cy.get("p").contains("You are now logged out");
    cy.get(".navbar-menu").within(() => {
      cy.get(".navbar-item")
        .not("User Status")

        .get(".navbar-item")
        .not("Log Out")
        .get(".navbar-item")
        .contains("Log In")
        .get(".navbar-item")
        .contains("Register");
    });
  });
  it('should display the sign in form', () => {
    cy
      .visit('/login')
      .get('h1').contains('Log In')
      .get('form')
      .get('input[disabled]')
      .get('.validation-list')
      .get('.validation-list > .error').first().contains(
        'Email is required.'); 
  });
});
