import React from 'react';
import PropTypes from 'prop-types';
import './RadioCard.scss';

const RadioCard = ({ name, handleRadioClick, value, current }) => (
  <div className="radio-card form-check form-check-inline">
    <label className="form-check-label" htmlFor={`line-chart-${value}`}>
      <input
        type="radio"
        id={`line-chart-${value}`}
        value={value}
        className="radio-card__input form-check-input"
        onChange={handleRadioClick}
        checked={current === value}
      />
      {`${name}`}
    </label>
  </div>
);

RadioCard.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  current: PropTypes.string.isRequired,
  handleRadioClick: PropTypes.func.isRequired
};

export default RadioCard;
