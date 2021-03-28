const randomstring = require('randomstring');

const username = randomstring.generate();
const email = `${username}@test.com`;
const password = 'greaterthanten';


describe('Exercises', () => {
  it('should display the exercises correctly if a user is not logged in', () => {
    cy
      .visit('/')
      .get('h1').contains('Exercises')
      .get('.notification.is-warning').contains('Please log in to submit an exercise.')
      .not('button');
  });

  it('should allow a user to submit an exercise if logged in', () => {
    cy.server();
    cy.route('POST', 'auth/register').as('createUser');
    cy.route('POST', Cypress.env('REACT_APP_API_GATEWAY_URL')).as('gradeExercise');

    // register a new user
    cy
      .visit('/register')
      .get('input[name="username"]').type(username)
      .get('input[name="email"]').type(email)
      .get('input[name="password"]').type(password)
      .get('input[type="submit"]').click()
      .wait('@createUser');

    // assert exercises are displayed correctly
    cy
      .get('h1').contains('Exercises')
      .get('.notification.is-success').contains('Welcome!')
      .not('.notification.is-danger')
      .get('button.button.is-primary').contains('Run Code');

    // assert user can submit an exercise
    cy
      .get('button').contains('Run Code').click()
      .wait(600)
      .get('grade-text').contains('Incorrect!');
  });
});