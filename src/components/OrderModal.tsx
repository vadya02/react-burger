import { useLocation } from 'react-router-dom';
import FeedOrderPage from '../pages/FeedOrderPage';
import ProfileOrderPage from '../pages/ProfileOrderPage';
import Modal from './Modal'; // ваш компонент модального окна

export default function OrderModal() {
  const location = useLocation();
  // Определяем, какой компонент заказа показывать по пути
  const isProfile = location.pathname.startsWith('/profile/orders/');

  return (
    <Modal>
      {isProfile ? <ProfileOrderPage /> : <FeedOrderPage />}
    </Modal>
  );
} 