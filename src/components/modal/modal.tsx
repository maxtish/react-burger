import ReactDOM from 'react-dom';
import React, { FC, ReactNode } from 'react';
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById('root');

interface IModalProps {
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<IModalProps> = ({ children, onClose }) => {
  React.useEffect(() => {
    const escClose = (evt: { key: string }) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', escClose);

    return () => {
      document.removeEventListener('keydown', escClose);
    };
  }, []);

  return ReactDOM.createPortal(
    <ModalOverlay onClick={onClose}>
      <div className={`${modalStyles.popup} pt-10 pl-10 pr-10`}>
        <div className={`${modalStyles.header}`}>
          <button className={`${modalStyles.button}`} onClick={onClose}>
            <CloseIcon type="primary" />
          </button>
        </div>

        <div className={modalStyles.children}>{children}</div>
      </div>
    </ModalOverlay>,
    modalRoot!
  );
};

export default Modal;
