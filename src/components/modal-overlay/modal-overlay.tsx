import modalOverlayStyles from './modal-overlay.module.css';
import React, { FC, ReactNode } from 'react';

interface IModalOverlayProps {
  onClick: () => void;
  children: ReactNode;
}

const ModalOverlay: FC<IModalOverlayProps> = ({ onClick, children }) => {
  const close = (evt: React.MouseEvent<HTMLElement>) => {
    if (evt.target === evt.currentTarget) {
      onClick();
    }
  };

  return (
    <div className={modalOverlayStyles.overlay} onClick={close}>
      {children}
    </div>
  );
};

export default ModalOverlay;
