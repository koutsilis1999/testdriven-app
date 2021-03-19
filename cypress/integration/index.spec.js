describe("Index", () => {
  it('should display the page correctly if a user is not logged in', () => {
    cy
      .visit('/')
      .get('h1').contains('All Users')
      .get('.navbar-burger').click()
      .get('a').not('User Status')
      .get('a').not('Log Out')
      .get('a').contains('Register')
      .get('a').contains('Log In')
      .not('.notification.is-success');
  });
});
