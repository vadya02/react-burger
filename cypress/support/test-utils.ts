import { SELECTORS } from './selectors';

// Константы для API endpoints
export const API_ENDPOINTS = {
  INGREDIENTS: '/api/ingredients',
  LOGIN: '/api/auth/login',
  ORDERS: '/api/orders'
} as const;

// Тестовые данные
export const TEST_DATA = {
  VALID_USER: {
    email: 'eee@ee.ru',
    password: '12345678'
  },
  INVALID_USER: {
    email: 'wrong@email.com',
    password: 'wrongpassword'
  }
} as const;

// Утилиты для тестов
export const TestUtils = {
  // Настройка перехвата API запросов
  interceptIngredients: () => {
    return cy.intercept('GET', API_ENDPOINTS.INGREDIENTS).as('getIngredients');
  },
  
  interceptLogin: () => {
    return cy.intercept('POST', API_ENDPOINTS.LOGIN).as('loginRequest');
  },
  
  interceptOrders: () => {
    return cy.intercept('POST', API_ENDPOINTS.ORDERS).as('createOrderRequest');
  },
  
  // Мокирование ошибок
  mockIngredientsError: () => {
    return cy.intercept('GET', API_ENDPOINTS.INGREDIENTS, {
      statusCode: 500,
      body: { success: false, message: 'Internal Server Error' }
    }).as('ingredientsError');
  },
  
  mockLoginError: () => {
    return cy.intercept('POST', API_ENDPOINTS.LOGIN, {
      statusCode: 401,
      body: { success: false, message: 'email or password are incorrect' }
    }).as('loginError');
  },
  
  // Проверки
  checkIngredientsLoaded: () => {
    cy.get(SELECTORS.INGREDIENTS_SECTION).should('be.visible');
    cy.get(SELECTORS.INGREDIENT_CARD).should('have.length.at.least', 8);
  },
  
  checkOrderAssembled: () => {
    cy.get(SELECTORS.BURGER_CONSTRUCTOR);
    cy.get(SELECTORS.FILLING_LIST);
  },
  
  checkRedirectedToLogin: () => {
    cy.url().should('include', '/login');
  },
  
  checkRedirectedToHome: () => {
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  }
} as const; 