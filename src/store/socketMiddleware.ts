import { Middleware, AnyAction } from '@reduxjs/toolkit';

// Интерфейс для конфигурации WebSocket соединения
export interface SocketConfig {
  connectActionType: string;
  disconnectActionType: string;
  connectingAction: () => AnyAction;
  openAction: () => AnyAction;
  closeAction: () => AnyAction;
  errorAction: (error: string) => AnyAction;
  messageAction: (data: any) => AnyAction;
}

// Интерфейс для payload при подключении
export interface ConnectPayload {
  url: string;
  config: SocketConfig;
}

// Глобальная переменная для хранения активных соединений
const activeConnections = new Map<string, WebSocket>();

export const socketConnect = (payload: ConnectPayload) => ({
  type: payload.config.connectActionType,
  payload
});

export const socketDisconnect = (config: SocketConfig) => ({
  type: config.disconnectActionType,
  payload: { config }
});

export const socketMiddleware: Middleware = store => next => action => {
  const { type, payload } = action as AnyAction;

  // Обработка подключения
  if (payload?.config?.connectActionType && type === payload.config.connectActionType) {
    const { url, config } = payload as ConnectPayload;
    
    console.log(`[Socket] Подключение к ${url} с конфигурацией:`, config.connectActionType);
    
    // Закрываем существующее соединение если есть
    const existingSocket = activeConnections.get(config.connectActionType);
    if (existingSocket) {
      console.log(`[Socket] Закрытие существующего соединения для ${config.connectActionType}`);
      existingSocket.close();
    }

    // Создаем новое соединение
    const socket = new WebSocket(url);
    activeConnections.set(config.connectActionType, socket);

    // Диспатчим действие подключения
    store.dispatch(config.connectingAction());

    socket.onopen = () => {
      console.log(`[Socket] Соединение установлено для ${config.connectActionType}`);
      store.dispatch(config.openAction());
    };

    socket.onclose = (event) => {
      console.log(`[Socket] Соединение закрыто для ${config.connectActionType}:`, event.code, event.reason);
      store.dispatch(config.closeAction());
      activeConnections.delete(config.connectActionType);
    };

    socket.onerror = (error) => {
      console.error(`[Socket] Ошибка соединения для ${config.connectActionType}:`, error);
      store.dispatch(config.errorAction('WebSocket error'));
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log(`[Socket] Получено сообщение для ${config.connectActionType}:`, data);
        store.dispatch(config.messageAction(data));
      } catch (error) {
        console.error(`[Socket] Ошибка парсинга сообщения для ${config.connectActionType}:`, error);
        store.dispatch(config.errorAction('Ошибка парсинга сообщения'));
      }
    };
  }

  // Обработка отключения
  if (payload?.config?.disconnectActionType && type === payload.config.disconnectActionType) {
    const { config } = payload as { config: SocketConfig };
    console.log(`[Socket] Отключение от ${config.connectActionType}`);
    const socket = activeConnections.get(config.connectActionType);
    
    if (socket) {
      socket.close();
      activeConnections.delete(config.connectActionType);
    }
  }

  return next(action);
}; 