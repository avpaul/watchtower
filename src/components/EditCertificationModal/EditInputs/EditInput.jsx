/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import './EditInput.scss';

const Input = props => {
  const { title, name, inputType, handleChange, value } = props;
  return (
    <div className="form-input">
      <label htmlFor={name} className="form-label">
        {title}
      </label>
      <input
        className="form-input__text"
        id={name}
        name={name}
        type={inputType}
        value={value}
        onChange={handleChange}
        {...props}
        required
      />
    </div>
  );
};

Input.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};
export default Input;
