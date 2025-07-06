# Настройка и запуск тестов Cypress

## 🚀 Быстрый старт

### 1. Установка зависимостей
```bash
npm install
```

### 2. Запуск приложения
```bash
npm start
```
Приложение будет доступно по адресу: http://localhost:3005

### 3. Запуск тестов

#### Интерактивный режим (рекомендуется для разработки)
```bash
npm run cypress:open
```

#### Автоматический режим (для CI/CD)
```bash
npm run cypress:run
```

## 📋 Доступные команды

| Команда | Описание |
|---------|----------|
| `npm run cypress:open` | Открыть Cypress Test Runner |
| `npm run cypress:run` | Запустить все тесты в headless режиме |
| `npm run cypress:run:simple` | Запустить только базовые тесты конструктора |
| `npm run cypress:run:order` | Запустить только тесты создания заказа |
| `npm run cypress:run:full` | Запустить полный пользовательский путь |

## 🧪 Структура тестов

### Основные тестовые файлы:

1. **`constructor-simple.cy.ts`** - Базовые тесты страницы конструктора
   - ✅ Загрузка ингредиентов
   - ✅ Переключение табов
   - ✅ Модальные окна ингредиентов
   - ✅ Состояние кнопки заказа

2. **`order-creation-simple.cy.ts`** - Тесты создания заказа
   - ✅ Перенаправление на логин
   - ✅ Авторизация
   - ✅ Создание заказа
   - ✅ Модальное окно заказа

3. **`full-user-journey.cy.ts`** - Полный пользовательский путь
   - ✅ Сбор бургера
   - ✅ Авторизация
   - ✅ Создание заказа
   - ✅ Интерактивность
   - ✅ Drag & Drop

## 🔧 Конфигурация

### Основные настройки (`cypress.config.ts`):
- **baseUrl**: http://localhost:3005
- **viewport**: 1280x720
- **timeout**: 10 секунд
- **screenshots**: включены при ошибках
- **videos**: отключены

### Тестовые данные:
- **Email**: test@example.com
- **Password**: password123

> ⚠️ **Важно**: Замените тестовые данные на реальные учетные записи вашей среды

## 🎯 Покрытие функциональности

### ✅ Перетаскивание ингредиентов (Drag & Drop)
- [x] Перетаскивание из списка в конструктор
- [x] Перетаскивание внутри конструктора
- [x] Визуальная обратная связь
- [x] Обновление счетчиков

### ✅ Создание заказа
- [x] Полный процесс от сбора до заказа
- [x] Авторизация пользователя
- [x] Валидация формы
- [x] Обработка ошибок

### ✅ Модальные окна
- [x] Открытие/закрытие модальных окон
- [x] Закрытие по клику на оверлей
- [x] Закрытие по Escape
- [x] Закрытие по кнопке

### ✅ Интерфейс пользователя
- [x] Переключение табов категорий
- [x] Отображение стоимости
- [x] Блокировка кнопки заказа
- [x] Состояния загрузки

## 🐛 Отладка тестов

### Полезные команды для отладки:

```javascript
// Пауза выполнения
cy.pause()

// Логирование
cy.log('Отладочное сообщение')

// Скриншот
cy.screenshot('debug-screenshot')

// Проверка элемента
cy.get('selector').should('be.visible').then($el => {
  console.log('Element:', $el)
})
```

### Частые проблемы и решения:

1. **Таймауты**
   ```javascript
   // Увеличьте timeout в конфигурации
   defaultCommandTimeout: 15000
   ```

2. **Drag & Drop не работает**
   ```javascript
   // Используйте force: true
   cy.get('element').trigger('mousedown', { button: 0, force: true })
   ```

3. **Модальные окна не открываются**
   ```javascript
   // Дождитесь полной загрузки
   cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible')
   ```

## 📊 Результаты тестов

### Структура отчетов:
```
cypress/
├── screenshots/          # Скриншоты при ошибках
├── videos/              # Видео записи (если включены)
└── downloads/           # Загруженные файлы
```

### Просмотр результатов:
1. Откройте `cypress/screenshots/` для скриншотов ошибок
2. Запустите `npm run cypress:open` для интерактивного просмотра
3. Проверьте консоль браузера для дополнительной информации

## 🔄 Интеграция с CI/CD

### GitHub Actions пример:
```yaml
name: Cypress Tests
on: [push, pull_request]
jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm start &
      - run: npm run cypress:run
        wait-on: 'http://localhost:3005'
```

### GitLab CI пример:
```yaml
cypress:
  image: cypress/included:12.0.0
  script:
    - npm ci
    - npm start &
    - npx wait-on http://localhost:3005
    - npm run cypress:run
```

## 📝 Добавление новых тестов

### Рекомендации:
1. Используйте описательные названия на русском языке
2. Группируйте связанные тесты в `describe` блоки
3. Используйте `beforeEach` для общей настройки
4. Добавляйте комментарии к сложным операциям
5. Используйте семантические селекторы

### Пример нового теста:
```typescript
describe('Новая функциональность', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="ingredients-section"]').should('be.visible');
  });

  it('должен тестировать новую функцию', () => {
    // Тестовые шаги
    cy.get('selector').click();
    cy.get('result').should('be.visible');
  });
});
```

## 🆘 Поддержка

При возникновении проблем:

1. ✅ Проверьте, что приложение запущено на http://localhost:3005
2. ✅ Убедитесь, что все зависимости установлены
3. ✅ Проверьте консоль браузера на ошибки
4. ✅ Запустите тесты в интерактивном режиме для отладки
5. ✅ Проверьте, что тестовые данные корректны

### Полезные ссылки:
- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Cypress Commands](https://docs.cypress.io/api/commands) 