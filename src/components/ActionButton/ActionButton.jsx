import React from 'react';
import PropTypes from 'prop-types';

import './actionButton.css';

/**
 * @method ActionButton
 * @summary - Re-usable functional component taking a click handler and the description text
 * @param { clickHandler {Function}
 * text {String}}
 * @returns Clickable text
 */
function ActionButton({ clickHandler, text }) {
  return (
    <button
      type="button"
      className="btn bg-transparent border-0 px-0 action-btn my-1"
      onClick={clickHandler}
    >
      {text}
    </button>
  );
}

/**
 * @name ActionButton Proptypes
 * @type (Proptypes)
 * @property clickHandler - Number
 * @property text - String
 */
ActionButton.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default ActionButton;
