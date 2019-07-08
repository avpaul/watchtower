import React from 'react';
import '../Header/Header.scss';

const renderArchiveHeader = (hideModal, handleBack) => (
  <div className="handle-close-archive">
    <button
      type="button"
      className="close"
      onClick={hideModal}
      aria-label="Close"
    >
      <span aria-hidden="true" className="cross" onClick={handleBack}>
        <b>&times;</b>
      </span>
    </button>
    <div className="modal-notification">
      <b>Archives</b>
      <span className="clear" aria-hidden="true" onClick={handleBack}>
        Go back
      </span>
    </div>
  </div>
);

export default renderArchiveHeader;
