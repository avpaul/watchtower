import React from 'react';
import PropTypes from 'prop-types';

export default function PopupModal(props) {
  const { modalTitle, modalSubtitle, modalBody, modalFooter } = props;
  return (
    <div>
      <div
        className="modal fade"
        id="pip-feedback-modal"
        roled="dialog"
        aria-labelledby="feedbackModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-head">
              <div className="modal-title">{modalTitle}</div>
              <div className="modal-date">{modalSubtitle}</div>
            </div>
            <div className="modal-body">{modalBody}</div>
            <div>{modalFooter}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

PopupModal.propTypes = {
  modalTitle: PropTypes.string,
  modalSubtitle: PropTypes.string,
  modalBody: PropTypes.element,
  modalFooter: PropTypes.element
};
PopupModal.defaultProps = {
  modalTitle: null,
  modalSubtitle: null,
  modalBody: null,
  modalFooter: null
};
