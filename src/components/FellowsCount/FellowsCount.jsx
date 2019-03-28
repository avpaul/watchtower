import React from 'react';
import PropTypes from 'prop-types';
import FilterButton from '../Buttons/Button';

const FellowsCount = ({ count, clearFilters, countName }) => {
  const resultTerm = count > 1 ? countName || 'Fellows' : countName || 'Fellow';
  return (
    <div className="ops-dashboard__fellows-summary fellow-summary-page-header">
      <span className="header-underline mr-2 pb-2">{`${count ||
        0} Total`}</span>
      <span className="mr-3">{`${resultTerm} (Filtered)`}</span>
      <FilterButton clearFilters={clearFilters} />
    </div>
  );
};

FellowsCount.propTypes = {
  count: PropTypes.number.isRequired,
  clearFilters: PropTypes.func,
  countName: PropTypes.string
};

FellowsCount.defaultProps = {
  clearFilters: () => {},
  countName: ''
};

export default FellowsCount;
