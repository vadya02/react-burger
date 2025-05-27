import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import styles from './App.module.css';
import AppHeader from './components/AppHeader/AppHeader';
import IngredientDetails from './components/IngredientDetails/IngredientDetails';
import Modal from './components/Modal/Modal';
import ProtectedRouteElement from './components/ProtectedRouteElement';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import IngredientPage from './pages/IngredientPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

function ModalSwitch() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state && location.state.background;

  return (
    <>
      <Routes location={state || location}>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={
          <ProtectedRouteElement onlyUnAuth>
            <LoginPage />
          </ProtectedRouteElement>
        } />
        <Route path="/register" element={
          <ProtectedRouteElement onlyUnAuth>
            <RegisterPage />
          </ProtectedRouteElement>
        } />
        <Route path="/forgot-password" element={
          <ProtectedRouteElement onlyUnAuth>
            <ForgotPasswordPage />
          </ProtectedRouteElement>
        } />
        <Route path="/reset-password" element={
          <ProtectedRouteElement onlyUnAuth>
            <ResetPasswordPage />
          </ProtectedRouteElement>
        } />
        <Route path="/profile/*" element={
          <ProtectedRouteElement>
            <ProfilePage />
          </ProtectedRouteElement>
        } />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Модалка поверх главной страницы */}
      {state && (
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

export default function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <AppHeader />
        <main className={styles.main}>
          <ModalSwitch />
        </main>
      </div>
    </BrowserRouter>
  );
} 