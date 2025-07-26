describe('Add Joke Form', () => {
    it('adds a joke and navigates to the homepage', () => {
        cy.visit('/add-joke');

        cy.get('[data-testid="joke-type"]').select('Dad Joke');
        cy.get('[data-testid="joke-setup"]').type('Why did the cat sit on the computer?');
        cy.get('[data-testid="joke-punchline"]').type('To keep an eye on the mouse.');
        cy.get('[data-testid="submit-joke"]').click();

        cy.url().should('include', '/?page=1');

        // Find the joke setup
        cy.contains('Why did the cat sit on the computer?').should('exist');

        // Click the "Punchline" button associated with this joke
        cy.contains('Why did the cat sit on the computer?')
            .parentsUntil('[class*=rounded-lg]') // reach the joke card container
            .parent()
            .within(() => {
                cy.contains('Punchline').click(); // Click reveal button
                cy.contains('To keep an eye on the mouse.').should('exist'); // Now assert punchline
            });
    });
});
