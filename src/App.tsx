import { FC } from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes, useLocation, useNavigate } from 'react-router-dom';
import AppHeader from './components/AppHeader/AppHeader';
import AuthCheck from './components/AuthCheck';
import { Modal } from './components/Modal/Modal';
import ProtectedRoute from './components/ProtectedRoute';
import ResetPasswordRoute from './components/ResetPasswordRoute';
import FeedOrderPage from './pages/FeedOrderPage';
import FeedPage from './pages/FeedPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import { IngredientPage } from './pages/IngredientPage';
import { LoginPage } from './pages/LoginPage';
import MainPage from './pages/MainPage';
import { NotFoundPage } from './pages/NotFoundPage';
import ProfileOrderPage from './pages/ProfileOrderPage';
import ProfileOrdersPage from './pages/ProfileOrdersPage';
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
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/feed/:number" element={<FeedOrderPage />} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/profile/orders" element={<ProtectedRoute><ProfileOrdersPage /></ProtectedRoute>} />
          <Route path="/profile/orders/:number" element={<ProtectedRoute><ProfileOrderPage /></ProtectedRoute>} />
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
              path="/feed/:number"
              element={
                <Modal onClose={() => navigate(-1)}>
                  <FeedOrderPage />
                </Modal>
              }
            />
            <Route
              path="/profile/orders/:number"
              element={
                <Modal onClose={() => navigate(-1)}>
                  <ProfileOrderPage />
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