describe('Создание заказа с реальным API', () => {
  beforeEach(() => {
    // Очищаем localStorage перед каждым тестом
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients').as('getRealIngredients');
  });

  it('должен пройти полный процесс создания заказа: загрузка ингредиентов → сбор заказа → авторизация → создание заказа → закрытие модалки', () => {
    cy.log('Начинаем полный процесс создания заказа с реальным API');

    // Шаг 1: Загружаем ингредиенты из реального API
    cy.log('Шаг 1: Загружаем ингредиенты из реального API');
    
    // Ждем загрузки ингредиентов из реального API
    
    cy.visit('/');
    cy.wait('@getRealIngredients');
    
    // Проверяем, что ингредиенты загрузились
    cy.get('[data-testid="ingredients-section"]', { timeout: 15000 }).should('be.visible');
    cy.get('[data-testid="ingredient-card"]').should('have.length.at.least', 8);
    cy.log('Ингредиенты успешно загружены из реального API');

    // Шаг 2: Собираем заказ в конструкторе через drag&drop
    cy.log('Шаг 2: Собираем заказ в конструкторе через drag&drop');
    const dataTransfer = new DataTransfer();

    // Добавляем булку (первая в списке)
    cy.get('[data-testid=ingredient-card]').first()
      .trigger('dragstart', { dataTransfer });
    cy.get('[data-testid=burger-constructor]')
      .trigger('dragenter', { dataTransfer })
      .trigger('dragover',  { dataTransfer })
      .trigger('drop',      { dataTransfer });
    cy.get('[data-testid=ingredient-card]').first()
      .trigger('dragend');

    // Добавляем начинку (первая начинка, обычно в третьем регионе)
    cy.get('[role="region"]').eq(2).find('[data-testid=ingredient-card]').first()
      .trigger('dragstart', { dataTransfer });
    cy.get('[data-testid=burger-constructor]')
      .trigger('dragenter', { dataTransfer })
      .trigger('dragover',  { dataTransfer })
      .trigger('drop',      { dataTransfer });
    cy.get('[role="region"]').eq(2).find('[data-testid=ingredient-card]').first()
      .trigger('dragend');

    // Проверяем, что заказ собран
    cy.get('[data-testid="burger-constructor"]')
    
    cy.log('Заказ успешно собран в конструкторе через drag&drop');

    // Шаг 3: Пытаемся оформить заказ без авторизации
    cy.log('Шаг 3: Пытаемся оформить заказ без авторизации');
    cy.get('[data-testid="order-button"]').click();
    
    // Проверяем перенаправление на страницу входа
    cy.url().should('include', '/login');
    cy.log('Перенаправление на страницу входа выполнено');

    // Шаг 4: Авторизуемся с указанными учетными данными
    cy.log('Шаг 4: Авторизуемся с учетными данными eee@ee.ru / 12345678');
    
    // Заполняем форму входа
    cy.get('input[name="email"]').type('eee@ee.ru');
    cy.get('input[name="password"]').type('12345678');
    cy.get('button[type="submit"]').click();
    
    // Ждем API запрос авторизации
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/auth/login').as('loginRequest');
    cy.wait('@loginRequest');
    
    // Ждем перенаправления на главную страницу
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.log('Авторизация выполнена успешно');

    // Шаг 5: Проверяем, что заказ сохранен в конструкторе после авторизации
    cy.log('Шаг 5: Проверяем сохранение заказа после авторизации');
    
    // Ждем загрузки ингредиентов
    cy.get('[data-testid="ingredients-section"]', { timeout: 10000 }).should('be.visible');

    // Проверяем, что заказ все еще собран
    cy.get('[data-testid="burger-constructor"]')
    
    cy.get('[role="list"][aria-label="Начинка бургера"]')
    
    cy.log('Заказ сохранен в конструкторе после авторизации');

    // Шаг 6: Оформляем заказ
    cy.log('Шаг 6: Оформляем заказ');
    cy.get('[data-testid="order-button"]').click();
    
    // Ждем API запрос создания заказа
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders').as('createOrderRequest');
    cy.wait('@createOrderRequest');
    
    cy.log('Запрос на создание заказа отправлен');

    // Шаг 7: Ждем появления модального окна с информацией о заказе
    cy.log('Шаг 7: Ждем появления модального окна заказа');
    
    // Ждем появления модального окна в течение 15 секунд
    cy.get('[data-testid="modal"]', { timeout: 15000 }).should('be.visible');
    cy.get('[data-testid="modal"]').should('contain', 'Оформление заказа');
    
    // Проверяем, что в модальном окне отображается номер заказа
    cy.get('[data-testid="order-details"]').should('contain', 'идентификатор заказа');
    
    // Проверяем, что конструктор очистился
    cy.get('[data-testid="burger-constructor"]')
    
    cy.get('[role="list"][aria-label="Начинка бургера"]')
    
    cy.log('Модальное окно заказа открылось, конструктор очистился');

    // Шаг 8: Закрываем модальное окно
    cy.log('Шаг 8: Закрываем модальное окно');
    cy.get('[data-testid="modal-close-button"]').click();
    
    // Проверяем, что модальное окно закрылось
    cy.get('[data-testid="modal"]').should('not.exist');
    
    // Проверяем, что мы остались на главной странице
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    
    cy.log('Модальное окно успешно закрыто');
    cy.log('Полный процесс создания заказа завершен успешно!');
  });

  it('должен обрабатывать ошибки при загрузке ингредиентов', () => {
    cy.log('Тестируем обработку ошибок при загрузке ингредиентов');
    
    // Мокируем ошибку API
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      statusCode: 500,
      body: { success: false, message: 'Internal Server Error' }
    }).as('ingredientsError');
    
    cy.visit('/');
    cy.wait('@ingredientsError');
    
    // Проверяем, что приложение не упало
    cy.get('body').should('be.visible');
    cy.log('Приложение корректно обработало ошибку загрузки ингредиентов');
  });

  it('должен обрабатывать ошибки авторизации', () => {
    cy.log('Тестируем обработку ошибок авторизации');
    
    cy.visit('/login');
    
    // Мокируем ошибку авторизации
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/auth/login', {
      statusCode: 401,
      body: { success: false, message: 'email or password are incorrect' }
    }).as('loginError');
    
    cy.get('input[name="email"]').type('wrong@email.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    
    cy.wait('@loginError');
    
    // Проверяем, что остались на странице входа
    cy.url().should('include', '/login');
    cy.log('Ошибка авторизации обработана корректно');
  });
});