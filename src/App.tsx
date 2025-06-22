import { FC } from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes, useLocation, useNavigate } from 'react-router-dom';
import AppHeader from './components/AppHeader/AppHeader';
import AuthCheck from './components/AuthCheck';
import { IngredientDetails } from './components/IngredientDetails/IngredientDetails';
import { Modal } from './components/Modal/Modal';
import ProtectedRoute from './components/ProtectedRoute';
import ResetPasswordRoute from './components/ResetPasswordRoute';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import { IngredientPage } from './pages/IngredientPage';
import { LoginPage } from './pages/LoginPage';
import MainPage from './pages/MainPage';
import { NotFoundPage } from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import store from './store/store';

interface LocationState {
  background?: Location;
}

const App: FC = () => {
  const location = useLocation();
  const background = (location.state as LocationState)?.background;
  const navigate = useNavigate();

  return (
    <>
      <AppHeader />
      <AuthCheck>
        <Routes location={background || location}>
          <Route path="/" element={<MainPage />} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/login" element={<ProtectedRoute anonymous={true}><LoginPage /></ProtectedRoute>} />
          <Route path="/register" element={<ProtectedRoute anonymous={true}><RegisterPage /></ProtectedRoute>} />
          <Route path="/forgot-password" element={<ProtectedRoute anonymous={true}><ForgotPasswordPage /></ProtectedRoute>} />
          <Route path="/reset-password" element={<ResetPasswordRoute><ResetPasswordPage /></ResetPasswordRoute>} />
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
      </AuthCheck>
    </>
  );
};

const AppWithStore: FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
};

export default AppWithStore; 