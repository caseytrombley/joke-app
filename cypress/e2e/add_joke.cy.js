describe('Add Joke via Modal', () => {
    it('adds a joke and verifies it appears in the list', () => {
        cy.visit('/?add=true');

        cy.get('[data-testid="joke-setup"]', { timeout: 8000 }).should('be.visible');

        cy.get('input[type="radio"][value="dad"]').check({ force: true });

        cy.get('[data-testid="joke-setup"]').type('Why did the cat sit on the computer?');
        cy.get('[data-testid="joke-punchline"]').type('To keep an eye on the mouse.');

        cy.get('[data-testid="submit-joke"]').click();

        cy.contains('Joke added!').should('be.visible');

        cy.contains('Joke added!').should('not.exist');

        cy.get('.joke-card').first().within(() => {
            cy.contains('Why did the cat sit on the computer?').should('exist');
            cy.contains('Punchline').click();
            cy.contains('To keep an eye on the mouse.').should('exist');
        });
    });
});
