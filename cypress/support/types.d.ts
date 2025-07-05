/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      login(email: string, password: string): Chainable<Element>
    }
  }
}

export { }

