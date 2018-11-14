import React from 'react';
import PropTypes from 'prop-types';
import './RadioCard.css';

const RadioCard = ({ name, count, handleRadioClick, value, current }) => (
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
      {`${name} - ${count}`}
    </label>
  </div>
);
RadioCard.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  current: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  handleRadioClick: PropTypes.func.isRequired
};

export default RadioCard;
