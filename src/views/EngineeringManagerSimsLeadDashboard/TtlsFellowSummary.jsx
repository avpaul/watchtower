import React from 'react';
import PropTypes from 'prop-types';
import FilterCard from '../../components/Filters/FilterCard';
import '../../components/FellowsSummary/FellowsSummary.css';
import FellowSummaryLabel from '../../components/FellowSummaryLabel/FellowSummaryLabel';

const FellowsSummary = ({ fellowsSummary, handleCardClick }) => (
  <div className="ops-dashboard__fellows-summary">
    <FellowSummaryLabel />
    <div className="row ops-dashboard__filter">
      {fellowsSummary.map(fellowSummary => (
        <div className="p-1">
          <FilterCard
            key={fellowSummary.id}
            filterId={fellowSummary.id}
            cardDetails={fellowSummary}
            className={
              fellowSummary.id === 'total-fellows-card'
                ? 'card total-fellows-card'
                : 'card'
            }
            onClick={handleCardClick}
          />
        </div>
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
