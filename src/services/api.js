import { getCookie } from '../utils/cookies';

const BASE_URL = 'https://norma.nomoreparties.space/api';

const getHeaders = () => {
  const token = getCookie('accessToken');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': token } : {})
  };
};

export const register = async (email, password, name) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password, name })
  });
  return response.json();
};

export const login = async (email, password) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  return response.json();
};

export const logout = async (refreshToken) => {
  const response = await fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: refreshToken })
  });
  return response.json();
};

export const refreshToken = async (refreshToken) => {
  const response = await fetch(`${BASE_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: refreshToken })
  });
  return response.json();
};

export const getUser = async () => {
  const response = await fetch(`${BASE_URL}/auth/user`, {
    method: 'GET',
    headers: getHeaders()
  });
  if (response.status === 401) {
    throw new Error('TOKEN_EXPIRED');
  }
  return response.json();
};

export const updateUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/auth/user`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify(userData)
  });
  if (response.status === 401) {
    throw new Error('TOKEN_EXPIRED');
  }
  return response.json();
};

export async function forgotPassword(email) {
  const res = await fetch(`${BASE_URL}/password-reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return res.json();
}

export async function resetPassword(password, token) {
  const res = await fetch(`${BASE_URL}/password-reset/reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, token }),
  });
  return res.json();
} 
