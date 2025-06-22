import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
}

const modalStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const contentStyle: React.CSSProperties = {
  background: '#222',
  borderRadius: 20,
  padding: 32,
  minWidth: 400,
  minHeight: 300,
  color: '#fff',
  position: 'relative',
};

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <div style={modalStyle} onClick={onClose}>
      <div style={contentStyle} onClick={e => e.stopPropagation()}>
        {onClose && (
          <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: '#fff', fontSize: 24, cursor: 'pointer' }}>&times;</button>
        )}
        {children}
      </div>
    </div>
  );
} 