import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const ModalOverlay = ({ onClick }) => {
  return <div className={styles.overlay} onClick={onClick} />;
};

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ModalOverlay; 