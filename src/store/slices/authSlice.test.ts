import authReducer, { clearError } from './authSlice';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const mockUser = { name: 'test', email: 'test@test.com' };

describe('authSlice reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle clearError', () => {
    const state = { ...initialState, error: 'Ошибка' };
    expect(authReducer(state, clearError())).toEqual(initialState);
  });

  it('should handle registerUser.pending', () => {
    const action = { type: 'auth/register/pending' };
    expect(authReducer(initialState, action)).toEqual({ ...initialState, isLoading: true });
  });

  it('should handle registerUser.fulfilled', () => {
    const action = { type: 'auth/register/fulfilled', payload: { user: mockUser } };
    expect(authReducer(initialState, action)).toEqual({ ...initialState, isAuthenticated: true, isLoading: false, user: mockUser });
  });

  it('should handle registerUser.rejected', () => {
    const action = { type: 'auth/register/rejected', error: { message: 'Ошибка регистрации' } };
    expect(authReducer(initialState, action)).toEqual({ ...initialState, isLoading: false, error: 'Ошибка регистрации' });
  });

  it('should handle loginUser.pending', () => {
    const action = { type: 'auth/login/pending' };
    expect(authReducer(initialState, action)).toEqual({ ...initialState, isLoading: true });
  });

  it('should handle loginUser.fulfilled', () => {
    const action = { type: 'auth/login/fulfilled', payload: { user: mockUser } };
    expect(authReducer(initialState, action)).toEqual({ ...initialState, isAuthenticated: true, isLoading: false, user: mockUser });
  });

  it('should handle loginUser.rejected', () => {
    const action = { type: 'auth/login/rejected', error: { message: 'Ошибка входа' } };
    expect(authReducer(initialState, action)).toEqual({ ...initialState, isLoading: false, error: 'Ошибка входа' });
  });

  it('should handle logoutUser.fulfilled', () => {
    const state = { ...initialState, isAuthenticated: true, user: mockUser };
    const action = { type: 'auth/logout/fulfilled' };
    expect(authReducer(state, action)).toEqual({ ...initialState });
  });

  it('should handle refreshUserToken.rejected', () => {
    const state = { ...initialState, isAuthenticated: true, user: mockUser };
    const action = { type: 'auth/refreshToken/rejected', error: { message: 'Ошибка обновления токена' } };
    expect(authReducer(state, action)).toEqual({ ...initialState, error: 'Ошибка обновления токена' });
  });

  it('should handle fetchUser.fulfilled', () => {
    const action = { type: 'auth/fetchUser/fulfilled', payload: mockUser };
    expect(authReducer(initialState, action)).toEqual({ ...initialState, isAuthenticated: true, isLoading: false, user: mockUser });
  });

  it('should handle fetchUser.rejected', () => {
    const state = { ...initialState, isAuthenticated: true, user: mockUser };
    const action = { type: 'auth/fetchUser/rejected', error: { message: 'Ошибка получения данных пользователя' } };
    expect(authReducer(state, action)).toEqual({ ...initialState, error: 'Ошибка получения данных пользователя' });
  });

  it('should handle updateUserData.fulfilled', () => {
    const state = { ...initialState, isAuthenticated: true, user: mockUser };
    const action = { type: 'auth/updateUser/fulfilled', payload: { ...mockUser, name: 'new' } };
    expect(authReducer(state, action)).toEqual({ ...state, isLoading: false, user: { ...mockUser, name: 'new' } });
  });

  it('should handle updateUserData.rejected', () => {
    const state = { ...initialState, isAuthenticated: true, user: mockUser };
    const action = { type: 'auth/updateUser/rejected', error: { message: 'Ошибка обновления данных пользователя' } };
    expect(authReducer(state, action)).toEqual({ ...state, isLoading: false, error: 'Ошибка обновления данных пользователя' });
  });
}); 