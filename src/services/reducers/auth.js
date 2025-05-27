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

const initialState = {
  user: null,
  isLoading: false,
  hasError: false,
  errorMessage: '',
  isAuth: false,
  isTokenUpdating: false,
  isUserLoading: false,
  isUserUpdating: false
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
      return { ...state, isLoading: true, hasError: false, errorMessage: '' };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        isAuth: true,
        hasError: false,
        errorMessage: ''
      };

    case LOGOUT_SUCCESS:
      return { ...state, isLoading: false, user: null, isAuth: false };

    case REGISTER_ERROR:
    case LOGIN_ERROR:
    case LOGOUT_ERROR:
      return { ...state, isLoading: false, hasError: true, errorMessage: action.payload };

    case SET_USER:
      return { ...state, user: action.payload, isAuth: true };

    case CLEAR_USER:
      return { ...state, user: null, isAuth: false };

    case TOKEN_UPDATE_REQUEST:
      return { ...state, isTokenUpdating: true };
    case TOKEN_UPDATE_SUCCESS:
      return { ...state, isTokenUpdating: false };
    case TOKEN_UPDATE_ERROR:
      return { ...state, isTokenUpdating: false, hasError: true, errorMessage: action.payload };

    case GET_USER_REQUEST:
      return { ...state, isUserLoading: true, hasError: false, errorMessage: '' };
    case GET_USER_SUCCESS:
      return { ...state, isUserLoading: false, user: action.payload, isAuth: true };
    case GET_USER_ERROR:
      return { ...state, isUserLoading: false, hasError: true, errorMessage: action.payload };

    case UPDATE_USER_REQUEST:
      return { ...state, isUserUpdating: true, hasError: false, errorMessage: '' };
    case UPDATE_USER_SUCCESS:
      return { ...state, isUserUpdating: false, user: action.payload };
    case UPDATE_USER_ERROR:
      return { ...state, isUserUpdating: false, hasError: true, errorMessage: action.payload };

    default:
      return state;
  }
} 