import React from 'react';
import PropTypes from 'prop-types';
import FilterCard from '../Filters/FilterCard';
import './FellowsSummary.css';

const FellowsSummary = ({ fellowsSummary, handleCardClick }) => (
  <div className="ops-dashboard__fellows-summary">
    <p className="ops-dashboard__fellow-summary-text text-uppercase mb-0">
      Fellows Summary
    </p>
    <div className="row ops-dashboard__filter">
      {fellowsSummary.map(fellowSummary => (
        <FilterCard
          key={fellowSummary.id}
          filterId={fellowSummary.id}
          cardDetails={fellowSummary}
          className="card"
          onClick={handleCardClick}
        />
      ))}
    </div>
  </div>
);

FellowsSummary.propTypes = {
  fellowsSummary: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    )
  ).isRequired,
  handleCardClick: PropTypes.func.isRequired
};

export default FellowsSummary;
