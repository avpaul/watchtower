import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ message, customStyle }) => {
  const defaultStyle = {
    width: '100%',
    margin: '1rem auto',
    fontSize: '2rem',
    textAlign: 'center',
  };

  const errorMessageStyle = { ...defaultStyle, ...customStyle };
  return (
    <div style={errorMessageStyle}>{message}</div>
  );
};

ErrorMessage.defaultProps = {
  customStyle: {},
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  customStyle: PropTypes.objectOf(PropTypes.string),
};

export default ErrorMessage;
