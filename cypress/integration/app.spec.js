describe('Navigation', () => {
    it('should navigate to the index page', () => {
        cy.visit('http://localhost:3000/')
        cy.get('button').contains('Sign in yo')
    })
})