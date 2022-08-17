import modalOverlayStyles from './modaloverlay.module.css';

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

export default ModalOverlay;
