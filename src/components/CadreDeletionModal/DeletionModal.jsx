import React from 'react';
import PropTypes from 'prop-types';
import cautionMark from '../../static/MarkDanger.svg';
import './DeletionModal.scss';

function DeletionModal({ handleClick, targetName }) {
  const deletionTargetLower = targetName.toLowerCase();
  const deletionTargetHeader =
    deletionTargetLower.charAt(0).toUpperCase() + deletionTargetLower.slice(1);

  const renderModalHeader = () => (
    <div className="modal-header">
      <span className="modal-title text-danger">
        <img src={cautionMark} alt={`delete ${deletionTargetLower} warning icon`} />
        Delete {deletionTargetHeader} ?
      </span>
      <button
        type="button"
        className="close"
        data-dismiss="modal"
        aria-label="Close"
      >
        <span aria-hidden="false">&times;</span>
      </button>
    </div>
  );

  const renderModalFooter = () => (
    <div className="modal-footer delete-footer">
      <button type="button" className="btn" data-dismiss="modal">
        No
      </button>
      <button
        type="button"
        onClick={handleClick}
        data-dismiss="modal"
        className="btn deleteBtn"
      >
        Yes, Delete
      </button>
    </div>
  );

  return (
    <div>
      <div
        className="modal fade"
        id={`delete-${deletionTargetLower}-modal`}
        roled="dialog"
        aria-labelledby={`delete${deletionTargetHeader}`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content h-auto">
            {renderModalHeader()}
            <div className="modal-body">
              Are you sure you want to delete this {deletionTargetLower}?
            </div>
            {renderModalFooter()}
          </div>
        </div>
      </div>
    </div>
  );
}

DeletionModal.propTypes = {
  handleClick: PropTypes.func.isRequired,
  targetName: PropTypes.string.isRequired
};

export default DeletionModal;
