import modalOverlayStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({ onClick, children }) => {
  const close = (evt) => {
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
ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
export default ModalOverlay;
