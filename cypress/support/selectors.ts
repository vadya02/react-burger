// Константы селекторов для избежания дублирования в тестах
export const SELECTORS = {
  // Ингредиенты
  INGREDIENTS_SECTION: '[data-testid="ingredients-section"]',
  INGREDIENT_CARD: '[data-testid="ingredient-card"]',
  
  // Конструктор бургера
  BURGER_CONSTRUCTOR: '[data-testid="burger-constructor"]',
  ORDER_BUTTON: '[data-testid="order-button"]',
  
  // Модальные окна
  MODAL: '[data-testid="modal"]',
  MODAL_CLOSE_BUTTON: '[data-testid="modal-close-button"]',
  ORDER_DETAILS: '[data-testid="order-details"]',
  
  // Формы авторизации
  EMAIL_INPUT: 'input[name="email"]',
  PASSWORD_INPUT: 'input[name="password"]',
  SUBMIT_BUTTON: 'button[type="submit"]',
  
  // Дополнительные селекторы
  FILLING_LIST: '[role="list"][aria-label="Начинка бургера"]',
  REGION: '[role="region"]'
} as const;

// Типы для TypeScript
export type SelectorKey = keyof typeof SELECTORS; 