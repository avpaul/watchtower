import React from 'react';
import PropTypes from 'prop-types';

const PaginationButton = ({
  className,
  name,
  value,
  onClick,
  buttonText,
  disableBool = false
}) => (
  <button
    type="button"
    className={className}
    value={value}
    name={name}
    onClick={onClick}
    disabled={disableBool}
    key={value}
  >
    {buttonText}
  </button>
);

PaginationButton.propTypes = {
  className: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  disableBool: PropTypes.bool
};

PaginationButton.defaultProps = {
  disableBool: false
};

export default PaginationButton;
