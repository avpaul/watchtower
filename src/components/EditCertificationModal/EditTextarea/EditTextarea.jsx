/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import './EditTextarea.scss';

const TextArea = props => {
  const { name, title, value, handleChange } = props;
  return (
    <div className="form-input">
      <label htmlFor={name} className="form-label">
        {title}
      </label>
      <textarea
        rows="4"
        className="form-input__textarea"
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default TextArea;
