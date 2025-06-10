import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, ReactNode, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import { ModalOverlay } from './ModalOverlay/ModalOverlay';

const modalRoot = document.getElementById('modals');

interface ModalProps {
  title?: string;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: FC<ModalProps> = ({ title, onClose, children }) => {
  const handleEscClose = useCallback((evt: KeyboardEvent): void => {
    if (evt.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [handleEscClose]);

  if (!modalRoot) {
    return null;
  }

  return ReactDOM.createPortal(
    (
      <>
        <ModalOverlay onClick={onClose} />
        <div className={styles.modal}>
          <div className={styles.header}>
            <h2 className="text text_type_main-large">
              {title}
            </h2>
            <button 
              className={styles.closeButton} 
              onClick={onClose}
              type="button"
              aria-label="Закрыть"
            >
              <CloseIcon type="primary" />
            </button>
          </div>
          <div className={styles.content}>
            {children}
          </div>
        </div>
      </>
    ),
    modalRoot
  );
}; 