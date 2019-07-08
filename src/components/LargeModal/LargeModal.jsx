import React from 'react';
import PropTypes from 'prop-types';
import './LargeModal.scss';

const Modal = ({ handleClose, show, children, title }) => {
  const showHideClassName = show
    ? 'modal display__modal'
    : 'modal close__modal';

  return (
    <div className={showHideClassName}>
      <section className="modal__body">
        <p className="modal__title">{title}</p>
        <button type="button" className="close" onClick={handleClose}>
          <span aria-hidden="true">&times;</span>
          <span className="sr-only">Close</span>
        </button>
        {children}
      </section>
    </div>
  );
};

Modal.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  children: PropTypes.shape().isRequired,
  title: PropTypes.string
};

Modal.defaultProps = {
  handleClose: () => {},
  show: false,
  title: null
};
export default Modal;
