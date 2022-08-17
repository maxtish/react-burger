import modalOverlayStyles from './modaloverlay.module.css';
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
  onClick: PropTypes.node.isRequired,
  children: PropTypes.func.isRequired,
};
export default ModalOverlay;
