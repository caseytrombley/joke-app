describe('Add Joke via Modal', () => {
    it('adds a joke and verifies it appears in the list', () => {
        cy.visit('/?add=true');

        // Wait for modal and setup input to appear
        cy.get('[data-testid="joke-setup"]', { timeout: 8000 }).should('be.visible');

        // Select "Dad Joke"
        cy.get('input[type="radio"][value="dad"]').check({ force: true });

        // Fill out form
        cy.get('[data-testid="joke-setup"]').type('Why did the cat sit on the computer?');
        cy.get('[data-testid="joke-punchline"]').type('To keep an eye on the mouse.');

        // Submit
        cy.get('[data-testid="submit-joke"]').click();

        // Confirm success message is visible
        cy.contains('Joke added!').should('be.visible');

        // Wait for it to go away (i.e., modal fade out completes)
        cy.contains('Joke added!').should('not.exist');

        // Verify joke is at the top of the list
        cy.get('.joke-card').first().within(() => {
            cy.contains('Why did the cat sit on the computer?').should('exist');
            cy.contains('Punchline').click();
            cy.contains('To keep an eye on the mouse.').should('exist');
        });
    });
});
