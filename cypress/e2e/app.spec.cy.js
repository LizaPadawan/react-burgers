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

    it('Should show ingredients modal', () => {
        cy.get('[id="portal"]').as('modal');

        cy.get('[test-id="ingredient"]').first().click();
        cy.get('@modal').contains('Детали ингредиента');
        cy.get('@modal').find('[test-id="close-modal"]').click();
    });

    it('Should add new ingredient to constructor using drag&drop', () => {
        cy.get('[test-id="ingredient"]').as('ingredient');
        cy.get('[test-id="constructor-spread"]').as('constructor');

        cy.get('@ingredient').eq(0).drag('@constructor');
        cy.get('@ingredient').eq(3).drag('@constructor');
    });

    it('Should login', () => {
        cy.get('[test-id="profile-link"]').as('profile');

        cy.get('@profile').contains('Личный кабинет').click();

        cy.get('[test-id="email"]').type('lizapadawan@yandex.ru');
        cy.get('[test-id="password"]').type('1q2w3e');
        cy.get('button').contains('Войти').click();
        cy.get('[test-id="profile-info"]').should('exist');

    });

    it('Should logout', () => {
        cy.get('[test-id="profile-link"]').as('profile');

        cy.get('@profile').contains('Личный кабинет').click();

        cy.get('[test-id="email"]').type('lizapadawan@yandex.ru');
        cy.get('[test-id="password"]').type('1q2w3e');
        cy.get('button').contains('Войти').click();
        cy.get('[test-id="profile-info"]').should('exist');

        cy.get('p').contains('Выход').click();
        cy.get('[test-id="profile-info"]').should('not.exist');
    });

    it('Should send new order', () => {
        cy.get('[id="portal"]').as('modal');
        cy.get('[test-id="ingredient"]').as('ingredient');
        cy.get('[test-id="constructor-spread"]').as('constructor');

        cy.get('@ingredient').eq(0).drag('@constructor');
        cy.get('@ingredient').eq(3).drag('@constructor');
        
        cy.get('@constructor').find('button').contains('Оформить заказ').click();

        cy.get('[test-id="email"]').type('lizapadawan@yandex.ru');
        cy.get('[test-id="password"]').type('1q2w3e');
        cy.get('button').contains('Войти').click();

        cy.get('@constructor').find('button').contains('Оформить заказ').click();

        // cy.get('[test-id="confirm-order"]').should('exist');
        // cy.get('[test-id="confirm-order"]').find('button').contains('Оформить заказ').click();

        cy.wait(16000).get('@modal').contains('Ваш заказ начали готовить');
        
        cy.get('@modal').find('[test-id="close-modal"]').click();
    });

});