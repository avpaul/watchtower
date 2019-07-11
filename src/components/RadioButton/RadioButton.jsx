/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropsTypes from 'prop-types';
import './RadioButton.scss';

const Radio = props => {
  const { title, name, value, handleChange, options } = props;
  return (
    <div className="form-input">
      {title && (
        <label htmlFor={name} className="form-label">
          {title}
        </label>
      )}
      <div className="form-input-inline">
        <div>
          <input
            className="form-radio"
            id={name}
            name={name}
            type="radio"
            value={`${value}`}
            onClick={handleChange}
            checked={value}
            {...props}
          />
          {options}
        </div>
      </div>
    </div>
  );
};

Radio.propTypes = {
  name: PropsTypes.string.isRequired,
  title: PropsTypes.string,
  value: PropsTypes.bool.isRequired,
  handleChange: PropsTypes.func.isRequired,
  options: PropsTypes.string.isRequired
};

Radio.defaultProps = {
  title: ''
};

export default Radio;
