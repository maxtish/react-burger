import ReactDOM from 'react-dom';
import React from 'react';
import PropTypes from 'prop-types';
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById('root');

function Modal({ children, header, onClose }) {
  setTimeout(
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
    }, []),
    5000
  );

  return ReactDOM.createPortal(
    <ModalOverlay onClick={onClose}>
      <div className={`${modalStyles.popup} pt-10 pl-10 pr-10`}>
        <div className={`${modalStyles.header}`}>
          <h2 className={`${modalStyles.title} text text_type_main-large`}>{header}</h2>
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
  header: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default Modal;
