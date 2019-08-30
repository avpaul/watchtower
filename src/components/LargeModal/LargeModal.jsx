import React from 'react';
import PropTypes from 'prop-types';

import './LargeModal.scss';

const Modal = ({
  handleClose,
  show,
  children,
  title,
  size = 'large',
  showBtn = true,
  maxWidth = 'none'
}) => {
  const showHideClassName = show
    ? 'modal display__modal'
    : 'modal close__modal';

  return (
    <div className={showHideClassName}>
      <section
        style={{ maxWidth }}
        className={size === 'large' ? 'modal__body' : 'modal-body__md'}
      >
        {title && <p className="modal__title">{title}</p>}
        {showBtn && (
          <button type="button" className="modal-close" onClick={handleClose}>
            <span aria-hidden="true">&times;</span>
            <span className="sr-only">Close</span>
          </button>
        )}
        {children}
      </section>
    </div>
  );
};

Modal.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.array.isRequired,
    PropTypes.object.isRequired
  ]).isRequired,
  title: PropTypes.string,
  size: PropTypes.string,
  showBtn: PropTypes.bool,
  maxWidth: PropTypes.string.isRequired
};

Modal.defaultProps = {
  handleClose: () => {},
  show: false,
  title: null,
  size: 'large',
  showBtn: true
};
export default Modal;
