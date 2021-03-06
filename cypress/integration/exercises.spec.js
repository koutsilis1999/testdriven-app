const randomstring = require("randomstring");

const username = randomstring.generate();
const email = `${username}@test.com`;
const password = "greaterthanten";

describe("Exercises", () => {
  it("should display the exercises correctly if a user is not logged in", () => {
    cy.visit("/")
      .get("h1")
      .contains("Exercises")
      .get(".notification.is-warning")
      .contains("Please log in to submit an exercise.")
      .get("button")
      .not("Run Code");
    // .get(".field.is-grouped")
    // .get("button")
    // .contains("Next")
    // .get("button")
    // .not("Prev");
  });

  it("should allow a user to submit an exercise if logged in", () => {
    cy.server();
    cy.route("POST", "auth/register").as("createUser");
    cy.route("POST", Cypress.env("REACT_APP_API_GATEWAY_URL")).as(
      "gradeExercise"
    );

    // register a new user
    cy.visit("/register")
      .get('input[name="username"]')
      .type(username)
      .get('input[name="email"]')
      .type(email)
      .get('input[name="password"]')
      .type(password)
      .get('input[type="submit"]')
      .click()
      .wait("@createUser");

    // assert exercises are displayed correctly
    // cy.get("h1")
    //   .contains("Exercises")
    //   .get(".notification.is-success")
    //   .contains("Welcome!")
    //   .not(".notification.is-danger")
    //   .get("button.button.is-primary")
    //   .contains("Run Code")
    //   .get(".field.is-grouped")
    //   .get("button")
    //   .contains("Next")
    //   .get("button")
    //   .not("Prev");

    // assert user can submit an exercise
    for (let i = 0; i < 23; i++) {
      cy.get("textarea").type("{backspace}", { force: true });
    }
    cy.get("textarea")
      .type("def sum(x,y):\nreturn x+y", { force: true })
      .get("button")
      .contains("Run Code")
      .click()
      .wait("@gradeExercise")
      .get("h5 > .grade-text")
      .contains("Correct!");
  });
  // it('should allow a user to move to different exercises', () => {
  //   cy
  //     .visit('/')
  //     .get('h1').contains('Exercises')
  //     .get('.notification.is-warning').contains('Please log in to submit an exercise.')
  //     .get('button').not('Run Code')
  //     .get('.field.is-grouped')
  //     .get('button').contains('Next')
  //     .get('button').not('Prev')
  //     .get('.ace_comment').contains('# Enter your code here.')  // new
  //     // click next
  //     .get('button').contains('Next').click()
  //     .get('button').contains('Next')
  //     .get('button').contains('Prev')
  //     .get('.ace_comment').contains('# Enter your code here.')  // new
  //     // click next
  //     .get('button').contains('Next').click()
  //     .get('button').not('Next')
  //     .get('button').contains('Prev')
  //     .get('.ace_comment').contains('# Enter your code here.')  // new
  //     // new
  //     for (let i = 0; i < 23; i++) {
  //       cy.get('textarea').type('{backspace}', { force: true })
  //     }
  //     cy
  //       .get('textarea').type('def sum(x,y):\nreturn x+y', { force: true })  // new
  //     // click prev
  //     .get('button').contains('Prev').click()
  //     .get('button').contains('Next')
  //     .get('button').contains('Prev')
  //     .get('.ace_comment').contains('# Enter your code here.');   // new
  // });
});
