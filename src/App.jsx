import { Provider } from 'react-redux';
import store from './store/store';
import AppHeader from './components/AppHeader/AppHeader';
import AuthCheck from './components/AuthCheck';
import { Routes, Route, useLocation, useNavigate, BrowserRouter as Router } from 'react-router';
import { useEffect } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ResetPasswordRoute from './components/ResetPasswordRoute';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import IngredientDetails from './components/IngredientDetails/IngredientDetails';
import {Modal} from './components/Modal/Modal';
import IngredientPage from './pages/IngredientPage';
import NotFoundPage from './pages/NotFoundPage';
import MainPage from './pages/MainPage';

function ModalSwitch() {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;

  useEffect(() => {
    if (background) {
      navigate(background.pathname, { replace: true });
    }
  }, [background, navigate]);

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<MainPage />} />
        
        {/* Защищенные маршруты */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        
        {/* Публичные маршруты */}
        <Route path="/login" element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        } />
        <Route path="/forgot-password" element={
          <PublicRoute>
            <ForgotPasswordPage />
          </PublicRoute>
        } />
        <Route path="/reset-password" element={
          <ResetPasswordRoute>
            <ResetPasswordPage />
          </ResetPasswordRoute>
        } />
        
        {/* Остальные маршруты */}
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AuthCheck>
        <AppHeader />
          <ModalSwitch />
        </AuthCheck>
      </Router>
    </Provider>
  );
}

export default App; 