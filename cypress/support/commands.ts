/// <reference types="cypress" />
import { SELECTORS } from './selectors';

// Команда для авторизации пользователя
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get(SELECTORS.EMAIL_INPUT).type(email);
  cy.get(SELECTORS.PASSWORD_INPUT).type(password);
  cy.get(SELECTORS.SUBMIT_BUTTON).click();
  cy.url().should('eq', Cypress.config().baseUrl + '/');
});

// Команда для добавления ингредиента в конструктор через drag&drop
Cypress.Commands.add('addIngredientToConstructor', (ingredientSelector: string) => {
  const dataTransfer = new DataTransfer();
  
  cy.get(ingredientSelector).first()
    .trigger('dragstart', { dataTransfer });
  cy.get(SELECTORS.BURGER_CONSTRUCTOR)
    .trigger('dragenter', { dataTransfer })
    .trigger('dragover', { dataTransfer })
    .trigger('drop', { dataTransfer });
  cy.get(ingredientSelector).first()
    .trigger('dragend');
});

// Команда для добавления булки в конструктор
Cypress.Commands.add('addBunToConstructor', () => {
  cy.addIngredientToConstructor(SELECTORS.INGREDIENT_CARD);
});

// Команда для добавления начинки в конструктор
Cypress.Commands.add('addFillingToConstructor', (regionIndex: number = 2) => {
  const fillingSelector = `${SELECTORS.REGION}:eq(${regionIndex}) ${SELECTORS.INGREDIENT_CARD}`;
  cy.addIngredientToConstructor(fillingSelector);
});

// Команда для ожидания загрузки ингредиентов
Cypress.Commands.add('waitForIngredients', (timeout: number = 15000) => {
  cy.get(SELECTORS.INGREDIENTS_SECTION, { timeout }).should('be.visible');
  cy.get(SELECTORS.INGREDIENT_CARD).should('have.length.at.least', 8);
});

// Команда для оформления заказа
Cypress.Commands.add('createOrder', () => {
  cy.get(SELECTORS.ORDER_BUTTON).click();
});

// Команда для ожидания модального окна заказа
Cypress.Commands.add('waitForOrderModal', (timeout: number = 15000) => {
  cy.get(SELECTORS.MODAL, { timeout }).should('be.visible');
  cy.get(SELECTORS.MODAL).should('contain', 'Оформление заказа');
});

// Команда для закрытия модального окна
Cypress.Commands.add('closeModal', () => {
  cy.get(SELECTORS.MODAL_CLOSE_BUTTON).click();
  cy.get(SELECTORS.MODAL).should('not.exist');
});

// Команда для проверки очистки конструктора
Cypress.Commands.add('checkConstructorCleared', () => {
  cy.get(SELECTORS.BURGER_CONSTRUCTOR);
  cy.get(SELECTORS.FILLING_LIST);
});

// Расширение типов Cypress
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      addIngredientToConstructor(ingredientSelector: string): Chainable<void>;
      addBunToConstructor(): Chainable<void>;
      addFillingToConstructor(regionIndex?: number): Chainable<void>;
      waitForIngredients(timeout?: number): Chainable<void>;
      createOrder(): Chainable<void>;
      waitForOrderModal(timeout?: number): Chainable<void>;
      closeModal(): Chainable<void>;
      checkConstructorCleared(): Chainable<void>;
    }
  }
}
