import styles from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

export const ModalOverlay = ({ onClick }) => {
  return <div className={styles.overlay} onClick={onClick} />;
};

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired
}; 