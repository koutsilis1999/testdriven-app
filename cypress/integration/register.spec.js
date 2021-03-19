const randomstring = require("randomstring");

const username = randomstring.generate();
const email = `${username}@test.com`;
const password = "greaterthanten";

describe("Register", () => {
  it("should display the registration form", () => {
    cy.visit("/register")
      .get("h1")
      .contains("Register")
      .get("form")
      .get("input[disabled]")
      .get(".validation-list")
      .get(".validation-list > .error")
      .first()
      .contains("Username must be greater than 5 characters.");
  });
  it("should allow a user to register", () => {
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

    // assert user is redirected to '/'
    // assert '/' is displayed properly
    cy.contains("All Users");
    cy.contains(username);
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
  });
  it("should validate the password field", () => {
    cy.visit("/register")
      .get("H1")
      .contains("Register")
      .get("form")
      .get("input[disabled]")
      .get(".validation-list > .error")
      .contains("Password must be greater than 10 characters.")
      .get('input[name="password"]')
      .type("greaterthanten")
      .get(".validation-list")
      // .get('.validation-list > .error').not(
      //   'Password must be greater than 10 characters.')
      .get(".validation-list > .success")
      .contains("Password must be greater than 10 characters.");

    // new
    cy.get(".navbar-burger").click();
    cy.get(".navbar-item").contains("Log In").click();
    cy.get(".navbar-item").contains("Register").click();
    cy.get(".validation-list > .error").contains(
      "Password must be greater than 10 characters."
    );
  });
  it("should throw an error if the username is taken", () => {
    // register user with duplicate user name
    cy.visit("/register")
      .get('input[name="username"]')
      .type(username)
      .get('input[name="email"]')
      .type(`${email}unique`)
      .get('input[name="password"]')
      .type(password)
      .get('input[type="submit"]')
      .click();

    // assert user registration failed
    cy.get('h1').not("All Users");
    cy.contains("Register");
    cy.get(".navbar-burger").click();
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
    cy
      .get(".notification.is-danger")
      .contains("That user already exists.");
  });
  it("should throw an error if the email is taken", () => {
    // register user with duplicate email
    cy.visit("/register")
      .get('input[name="username"]')
      .type(`${username}unique`)
      .get('input[name="email"]')
      .type(email)
      .get('input[name="password"]')
      .type(password)
      .get('input[type="submit"]')
      .click();

    // assert user registration failed
    cy.get('h1').not("All Users");
    cy.contains("Register");
    cy.get(".navbar-burger").click();
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
    cy
      .get(".notification.is-danger")
      .contains("That user already exists.");
  });
});
