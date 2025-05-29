import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register, login, logout, refreshToken, getUser, updateUser } from '../../services/api';
import { setCookie, getCookie, deleteCookie } from '../../utils/cookies';

const handleTokenExpired = async (refreshTokenValue, dispatch) => {
  try {
    const response = await refreshToken(refreshTokenValue);
    if (response.success) {
      setCookie('accessToken', response.accessToken, { expires: 1200 }); // 20 минут
      setCookie('refreshToken', response.refreshToken, { expires: 604800 }); // 7 дней
      return response.accessToken;
    }
    throw new Error('Ошибка обновления токена');
  } catch (error) {
    dispatch(logoutUser());
    throw error;
  }
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ email, password, name }) => {
    const response = await register(email, password, name);
    if (response.success) {
      setCookie('accessToken', response.accessToken, { expires: 1200 }); // 20 минут
      setCookie('refreshToken', response.refreshToken, { expires: 604800 }); // 7 дней
      return response;
    }
    throw new Error(response.message || 'Ошибка регистрации');
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {
    const response = await login(email, password);
    if (response.success) {
      setCookie('accessToken', response.accessToken, { expires: 1200 }); // 20 минут
      setCookie('refreshToken', response.refreshToken, { expires: 604800 }); // 7 дней
      return response;
    }
    throw new Error(response.message || 'Ошибка входа');
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    const refreshToken = getCookie('refreshToken');
    const response = await logout(refreshToken);
    if (response.success) {
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      return response;
    }
    throw new Error(response.message || 'Ошибка выхода');
  }
);

export const refreshUserToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { dispatch }) => {
    const refreshToken = getCookie('refreshToken');
    const response = await refreshToken(refreshToken);
    if (response.success) {
      setCookie('accessToken', response.accessToken, { expires: 1200 }); // 20 минут
      setCookie('refreshToken', response.refreshToken, { expires: 604800 }); // 7 дней
      return response;
    }
    throw new Error(response.message || 'Ошибка обновления токена');
  }
);

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (_, { dispatch }) => {
    try {
      const response = await getUser();
      if (response.success) {
        return response.user;
      }
      throw new Error(response.message || 'Ошибка получения данных пользователя');
    } catch (error) {
      if (error.message === 'TOKEN_EXPIRED') {
        const refreshToken = getCookie('refreshToken');
        await handleTokenExpired(refreshToken, dispatch);
        const retryResponse = await getUser();
        if (retryResponse.success) {
          return retryResponse.user;
        }
      }
      throw error;
    }
  }
);

export const updateUserData = createAsyncThunk(
  'auth/updateUser',
  async (userData, { dispatch }) => {
    try {
      const response = await updateUser(userData);
      if (response.success) {
        return response.user;
      }
      throw new Error(response.message || 'Ошибка обновления данных пользователя');
    } catch (error) {
      if (error.message === 'TOKEN_EXPIRED') {
        const refreshToken = getCookie('refreshToken');
        await handleTokenExpired(refreshToken, dispatch);
        const retryResponse = await updateUser(userData);
        if (retryResponse.success) {
          return retryResponse.user;
        }
      }
      throw error;
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Регистрация
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Вход
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Выход
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Обновление токена
      .addCase(refreshUserToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshUserToken.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(refreshUserToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.isAuthenticated = false;
        state.user = null;
      })
      // Получение данных пользователя
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.isAuthenticated = false;
        state.user = null;
      })
      // Обновление данных пользователя
      .addCase(updateUserData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer; 