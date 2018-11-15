import React from 'react';
import PropTypes from 'prop-types';
import './ManagerFellowSortInput.css';

const ManagerFellowSortInput = ({ onChange }) => (
  <div className="sort-managers">
    <select className="sort-managers__select" onChange={onChange}>
      <option className="sort-managers__option" value="HIGH_TO_LOW">Fellows Ratio, high to low</option>
      <option className="sort-managers__option" value="LOW_TO_HIGH">Fellows Ratio, low to high</option>
    </select>
  </div>
);

ManagerFellowSortInput.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default ManagerFellowSortInput;
