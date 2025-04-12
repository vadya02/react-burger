import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import ModalOverlay from './ModalOverlay';

const modalRoot = document.getElementById('modals');

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleEscClose);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscClose);
  }

  handleEscClose = (e) => {
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    return ReactDOM.createPortal(
      <>
        <ModalOverlay onClick={this.props.onClose} />
        <div className={styles.modal}>
          <button className={styles.closeButton} onClick={this.props.onClose}>
            <CloseIcon type="primary" />
          </button>
          {this.props.children}
        </div>
      </>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
}; 