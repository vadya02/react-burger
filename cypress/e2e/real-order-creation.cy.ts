import { SELECTORS } from '../support/selectors';
import { TEST_DATA, TestUtils } from '../support/test-utils';

describe('Создание заказа с реальным API', () => {
  beforeEach(() => {
    // Очищаем localStorage перед каждым тестом
    cy.clearLocalStorage();
    cy.clearCookies();
    TestUtils.interceptIngredients();
  });

  it('должен пройти полный процесс создания заказа: загрузка ингредиентов → сбор заказа → авторизация → создание заказа → закрытие модалки', () => {
    cy.log('Начинаем полный процесс создания заказа с реальным API');

    // Шаг 1: Загружаем ингредиенты из реального API
    cy.log('Шаг 1: Загружаем ингредиенты из реального API');
    
    cy.visit('/');
    cy.wait('@getIngredients');
    
    // Проверяем, что ингредиенты загрузились
    cy.waitForIngredients(15000);
    cy.log('Ингредиенты успешно загружены из реального API');

    // Шаг 2: Собираем заказ в конструкторе через drag&drop
    cy.log('Шаг 2: Собираем заказ в конструкторе через drag&drop');
    
    // Добавляем булку (первая в списке)
    cy.addBunToConstructor();
    
    // Добавляем начинку (первая начинка, обычно в третьем регионе)
    cy.addFillingToConstructor(2);
    
    // Проверяем, что заказ собран
    cy.get(SELECTORS.BURGER_CONSTRUCTOR);
    cy.log('Заказ успешно собран в конструкторе через drag&drop');

    // Шаг 3: Пытаемся оформить заказ без авторизации
    cy.log('Шаг 3: Пытаемся оформить заказ без авторизации');
    cy.createOrder();
    
    // Проверяем перенаправление на страницу входа
    TestUtils.checkRedirectedToLogin();
    cy.log('Перенаправление на страницу входа выполнено');

    // Шаг 4: Авторизуемся с указанными учетными данными
    cy.log('Шаг 4: Авторизуемся с учетными данными eee@ee.ru / 12345678');
    
    // Заполняем форму входа
    cy.get(SELECTORS.EMAIL_INPUT).type(TEST_DATA.VALID_USER.email);
    cy.get(SELECTORS.PASSWORD_INPUT).type(TEST_DATA.VALID_USER.password);
    cy.get(SELECTORS.SUBMIT_BUTTON).click();
    
    // Ждем API запрос авторизации
    TestUtils.interceptLogin();
    cy.wait('@loginRequest');
    
    // Ждем перенаправления на главную страницу
    TestUtils.checkRedirectedToHome();
    cy.log('Авторизация выполнена успешно');

    // Шаг 5: Проверяем, что заказ сохранен в конструкторе после авторизации
    cy.log('Шаг 5: Проверяем сохранение заказа после авторизации');
    
    // Ждем загрузки ингредиентов
    cy.get(SELECTORS.INGREDIENTS_SECTION, { timeout: 10000 }).should('be.visible');

    // Проверяем, что заказ все еще собран
    TestUtils.checkOrderAssembled();
    cy.log('Заказ сохранен в конструкторе после авторизации');

    // Шаг 6: Оформляем заказ
    cy.log('Шаг 6: Оформляем заказ');
    cy.createOrder();
    
    // Ждем API запрос создания заказа
    TestUtils.interceptOrders();
    cy.wait('@createOrderRequest');
    
    cy.log('Запрос на создание заказа отправлен');

    // Шаг 7: Ждем появления модального окна с информацией о заказе
    cy.log('Шаг 7: Ждем появления модального окна заказа');
    
    // Ждем появления модального окна в течение 15 секунд
    cy.waitForOrderModal(15000);
    
    // Проверяем, что в модальном окне отображается номер заказа
    cy.get(SELECTORS.ORDER_DETAILS).should('contain', 'идентификатор заказа');
    
    // Проверяем, что конструктор очистился
    cy.checkConstructorCleared();
    cy.log('Модальное окно заказа открылось, конструктор очистился');

    // Шаг 8: Закрываем модальное окно
    cy.log('Шаг 8: Закрываем модальное окно');
    cy.closeModal();
    
    // Проверяем, что мы остались на главной странице
    TestUtils.checkRedirectedToHome();
    
    cy.log('Модальное окно успешно закрыто');
    cy.log('Полный процесс создания заказа завершен успешно!');
  });

  it('должен обрабатывать ошибки при загрузке ингредиентов', () => {
    cy.log('Тестируем обработку ошибок при загрузке ингредиентов');
    
    // Мокируем ошибку API
    TestUtils.mockIngredientsError();
    
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
    TestUtils.mockLoginError();
    
    cy.get(SELECTORS.EMAIL_INPUT).type(TEST_DATA.INVALID_USER.email);
    cy.get(SELECTORS.PASSWORD_INPUT).type(TEST_DATA.INVALID_USER.password);
    cy.get(SELECTORS.SUBMIT_BUTTON).click();
    
    cy.wait('@loginError');
    
    // Проверяем, что остались на странице входа
    TestUtils.checkRedirectedToLogin();
    cy.log('Ошибка авторизации обработана корректно');
  });
});