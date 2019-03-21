import React from 'react';
import PropTypes from 'prop-types';
import FilterButton from '../Buttons/Button';

const FellowsCount = ({ count, clearFilters }) => {
  const resultTerm = count > 1 ? 'Fellows' : 'Fellow';
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
  clearFilters: PropTypes.func
};

FellowsCount.defaultProps = {
  clearFilters: () => {}
};

export default FellowsCount;
