import React from 'react';
import PropTypes from 'prop-types';
import './ManagerFellowSortInput.css';

const ManagerFellowSortInput = ({ onChange }) => (
  <div className="sort-managers">
    <select className="sort-managers__select" onChange={onChange}>
      <option className="sort-managers__option" value="HIGH_TO_LOW">
        High to Low
      </option>
      <option className="sort-managers__option" value="LOW_TO_HIGH">
        Low to High
      </option>
    </select>
  </div>
);

ManagerFellowSortInput.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default ManagerFellowSortInput;
