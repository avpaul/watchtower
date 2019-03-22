import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const FilterButton = ({ clearFilters }) => (
  <button
    className="btn bg-transparent border-0 px-0 clear-filters my-3"
    style={{ textDecoration: 'underline' }}
    type="button"
    onClick={clearFilters}
  >
    Clear Filters
  </button>
);

FilterButton.propTypes = {
  clearFilters: PropTypes.func
};

FilterButton.defaultProps = {
  clearFilters: () => {}
};

export default FilterButton;
