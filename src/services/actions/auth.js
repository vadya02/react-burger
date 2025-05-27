import { getCookie } from '../../utils/cookie';
import {
  CLEAR_USER,
  GET_USER_ERROR,
  GET_USER_REQUEST, GET_USER_SUCCESS,
  LOGIN_ERROR,
  LOGIN_REQUEST, LOGIN_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_REQUEST, LOGOUT_SUCCESS,
  REGISTER_ERROR,
  REGISTER_REQUEST, REGISTER_SUCCESS,
  SET_USER,
  TOKEN_UPDATE_ERROR,
  TOKEN_UPDATE_REQUEST, TOKEN_UPDATE_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS
} from '../types/auth';

const getAccessToken = () => localStorage.getItem('accessToken')?.replace('Bearer ', '');

// Регистрация
export const register = (email, password, name) => (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  fetch('https://norma.nomoreparties.space/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name })
  })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .then(data => {
      if (data.success) {
        dispatch({ type: REGISTER_SUCCESS, payload: data });
        dispatch({ type: SET_USER, payload: data.user });
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
      } else {
        dispatch({ type: REGISTER_ERROR, payload: data.message });
      }
    })
    .catch(err => dispatch({ type: REGISTER_ERROR, payload: err.toString() }));
};

// Авторизация
export const login = (email, password) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  fetch('https://norma.nomoreparties.space/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .then(data => {
      if (data.success) {
        dispatch({ type: LOGIN_SUCCESS, payload: data });
        dispatch({ type: SET_USER, payload: data.user });
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
      } else {
        dispatch({ type: LOGIN_ERROR, payload: data.message });
      }
    })
    .catch(err => dispatch({ type: LOGIN_ERROR, payload: err.toString() }));
};

// Получение данных пользователя
export const getUser = () => (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  fetch('https://norma.nomoreparties.space/api/auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getCookie('accessToken')
    }
  })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .then(data => {
      if (data.success) {
        dispatch({ type: GET_USER_SUCCESS, payload: data.user });
      } else {
        dispatch({ type: GET_USER_ERROR, payload: data.message });
      }
    })
    .catch(err => dispatch({ type: GET_USER_ERROR, payload: err.toString() }));
};

// Обновление токена
export const updateToken = (callback) => (dispatch) => {
  dispatch({ type: TOKEN_UPDATE_REQUEST });
  fetch('https://norma.nomoreparties.space/api/auth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
  })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .then(data => {
      if (data.success) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        dispatch({ type: TOKEN_UPDATE_SUCCESS });
        if (typeof callback === 'function') {
          dispatch(callback());
        }
      } else {
        dispatch({ type: TOKEN_UPDATE_ERROR, payload: data.message });
        dispatch(logout());
      }
    })
    .catch(err => {
      dispatch({ type: TOKEN_UPDATE_ERROR, payload: err.toString() });
      dispatch(logout());
    });
};

// Выход
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  fetch('https://norma.nomoreparties.space/api/auth/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
  })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .then(data => {
      if (data.success) {
        dispatch({ type: LOGOUT_SUCCESS });
        dispatch({ type: CLEAR_USER });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      } else {
        dispatch({ type: LOGOUT_ERROR, payload: data.message });
      }
    })
    .catch(err => dispatch({ type: LOGOUT_ERROR, payload: err.toString() }));
};

// Обновление информации о пользователе
export const updateUser = (userData) => (dispatch) => {
  dispatch({ type: UPDATE_USER_REQUEST });
  fetch('https://norma.nomoreparties.space/api/auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify(userData)
  })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .then(data => {
      if (data.success) {
        dispatch({ type: UPDATE_USER_SUCCESS, payload: data.user });
      } else {
        dispatch({ type: UPDATE_USER_ERROR, payload: data.message });
      }
    })
    .catch(err => dispatch({ type: UPDATE_USER_ERROR, payload: err.toString() }));
}; 