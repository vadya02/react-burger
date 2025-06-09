import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import { ModalOverlay } from './ModalOverlay/ModalOverlay';

const modalRoot = document.getElementById('modals');

export const Modal = ({ title, onClose, children }) => {
  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscClose);
    
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    (
      <>
        <ModalOverlay onClick={onClose} />
        <div className={styles.modal}>
          <div className={styles.header}>
            <h2 className="text text_type_main-large">
              {title}
            </h2>
            <button className={styles.closeButton} onClick={onClose}>
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

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}; 