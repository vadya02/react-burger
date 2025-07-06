/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      login(email: string, password: string): Chainable<Element>;
      addIngredientToConstructor(ingredientSelector: string): Chainable<Element>;
      addBunToConstructor(): Chainable<Element>;
      addFillingToConstructor(regionIndex?: number): Chainable<Element>;
      waitForIngredients(timeout?: number): Chainable<Element>;
      createOrder(): Chainable<Element>;
      waitForOrderModal(timeout?: number): Chainable<Element>;
      closeModal(): Chainable<Element>;
      checkConstructorCleared(): Chainable<Element>;
    }
  }
}

export { };

