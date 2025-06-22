import { FC, MouseEvent } from 'react';
import styles from './ModalOverlay.module.css';

interface ModalOverlayProps {
  onClick: () => void;
}

export const ModalOverlay: FC<ModalOverlayProps> = ({ onClick }) => {
  const handleClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onClick();
    }
  };

  return (
    <div 
      className={styles.overlay} 
      onClick={handleClick}
      role="presentation"
    />
  );
}; 