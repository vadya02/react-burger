import { Provider } from 'react-redux';
import store from './store/store.js';
import AppHeader from './components/AppHeader/AppHeader';
import AuthCheck from './components/AuthCheck';
import { Routes, Route, useLocation, BrowserRouter as Router, useNavigate } from 'react-router';
import ProtectedRoute from './components/ProtectedRoute';
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

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
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
}

export default function AppWithStore() {
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
} 