import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const CadreMainButton = ({ buttonProps, label }) => (
  <button
    id={`cadre-button-${label.toLowerCase().replace(' ', '-')}`}
    className="cadre-main-button"
    type="button"
    {...buttonProps}
  >
    {label}
  </button>
);

CadreMainButton.propTypes = {
  label: PropTypes.string.isRequired,
  buttonProps: PropTypes.shape()
};

CadreMainButton.defaultProps = {
  buttonProps: {}
};

export default CadreMainButton;
