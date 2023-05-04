import '@4tw/cypress-drag-drop';

const baseUrl = 'http://localhost:3000/';
const constructorSpreadSelector = '[test-id="constructor-spread"]';
const portalSelector = '[id="portal"]';
const ingredientSelector = '[test-id="ingredient"]';
const closeModalSelector = '[test-id="close-modal"]';
const profileInfoSelector = '[test-id="profile-info"]';
const profileLinkSelector = '[test-id="profile-link"]';
const emailSelector = '[test-id="email"]';
const passwordSelector = '[test-id="password"]';

describe('service is available', function() {
    beforeEach(() => {
        cy.visit(baseUrl);
    });

    it('should be available on localhost:3000', function() {
          cy.visit(baseUrl);
        });
      
    it('Should constructor container not exist', () => {
        cy.get('[test-id="constructor"]').should('not.exist');
        cy.get('[test-id="empty_constructor"]').should('exist');
    });

    it('Should show ingredients modal', () => {
        cy.get(portalSelector).as('modal');

        cy.get(ingredientSelector).first().click();
        cy.get('@modal').contains('Детали ингредиента');
        cy.get('@modal').find(closeModalSelector).click();
    });

    it('Should add new ingredient to constructor using drag&drop', () => {
        cy.get(ingredientSelector).as('ingredient');
        cy.get(constructorSpreadSelector).as('constructor');

        cy.get('@ingredient').eq(0).drag('@constructor');
        cy.get('@ingredient').eq(3).drag('@constructor');
    });

    it('Should login', () => {
        cy.get(profileLinkSelector).as('profile');

        cy.get('@profile').contains('Личный кабинет').click();

        cy.get(emailSelector).type('lizapadawan@yandex.ru');
        cy.get(passwordSelector).type('1q2w3e');
        cy.get('button').contains('Войти').click();
        cy.get(profileInfoSelector).should('exist');

    });

    it('Should logout', () => {
        cy.get(profileLinkSelector).as('profile');

        cy.get('@profile').contains('Личный кабинет').click();

        cy.get(emailSelector).type('lizapadawan@yandex.ru');
        cy.get(passwordSelector).type('1q2w3e');
        cy.get('button').contains('Войти').click();
        cy.get(profileInfoSelector).should('exist');

        cy.get('p').contains('Выход').click();
        cy.get(profileInfoSelector).should('not.exist');
    });

    it('Should send new order', () => {
        cy.get(portalSelector).as('modal');
        cy.get(ingredientSelector).as('ingredient');
        cy.get(constructorSpreadSelector).as('constructor');

        cy.get('@ingredient').eq(0).drag('@constructor');
        cy.get('@ingredient').eq(3).drag('@constructor');
        
        cy.get('@constructor').find('button').contains('Оформить заказ').click();

        cy.get(emailSelector).type('lizapadawan@yandex.ru');
        cy.get(passwordSelector).type('1q2w3e');
        cy.get('button').contains('Войти').click();

        cy.get('@constructor').find('button').contains('Оформить заказ').click();

        cy.wait(16000).get('@modal').contains('Ваш заказ начали готовить');
        
        cy.get('@modal').find(closeModalSelector).click();
    });

});