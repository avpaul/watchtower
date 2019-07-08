import React from 'react';
import '../Header/Header.scss';

const renderNotificationHeader = (hideModal, handleClick) => (
  <div className="handle-close">
    <button
      type="button"
      className="close"
      onClick={hideModal}
      aria-label="Close"
    >
      <span aria-hidden="true" className="cross">
        <b>&times;</b>
      </span>
    </button>
    <div className="modal-notification">
      <b>Notifications</b>
      <span className="clear" aria-hidden="true" onClick={handleClick}>
        View Archives
      </span>
    </div>
  </div>
);

export default renderNotificationHeader;
