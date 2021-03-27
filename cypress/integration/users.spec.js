describe('All Users', () => {
    it('should display the all-users page correctly if a user is not logged in', () => {
      cy
        .visit('/all-users')
        .get('h1').contains('All Users')
        .get('.navbar-burger').click()
        .get('a').not('User Status')
        .get('a').not('Log Out')
        .get('a').contains('Register')
        .get('a').contains('Log In')
        .get('a').contains('Swagger')
        .get('a').contains('Users')
        .not('.notification.is-success');
    });
  });