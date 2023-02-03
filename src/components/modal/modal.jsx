import ReactDOM from 'react-dom';
import React from 'react';
import PropTypes from 'prop-types';
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById('root');

function Modal({ children, onClose }) {
  React.useEffect(() => {
    const escClose = (evt) => {
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
    modalRoot
  );
}
Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default Modal;
