import '@4tw/cypress-drag-drop';

describe('service is available', function() {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('should be available on localhost:3000', function() {
          cy.visit('http://localhost:3000/');
        });
      
    it('Should constructor container not exist', () => {
        cy.get('[test-id="constructor"]').should('not.exist');
        cy.get('[test-id="empty_constructor"]').should('exist');
    });

    it('Should show ingredient details modal', () => {
        cy.get('[id="portal"]').as('modal');

        cy.get('[test-id="ingredient"]').first().click();
        cy.get('@modal').contains('Детали ингредиента');
        cy.get('@modal').find('[test-id="close-modal"]').click();
    });

});