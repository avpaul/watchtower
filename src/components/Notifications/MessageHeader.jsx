import React from 'react';
import '../Header/Header.scss';

/**
 * function to return the message header
 * @function
 */
const renderMessageHeader = () => (
  <div>
    <button type="button" className="close" aria-label="Close">
      <span aria-hidden="false">&times;</span>
    </button>
  </div>
);

export default renderMessageHeader;
